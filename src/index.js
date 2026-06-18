import React, { useState, useEffect, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './Styling/index.css';
import './Config/firebase-config';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import axios from 'axios';
import io from 'socket.io-client';
import App from './App';

function getFirebaseErrorMessage(code) {
  const messages = {
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
  };
  return messages[code] || 'An error occurred. Please try again.';
}

export const AppContext = createContext();

function AppProvider() {
  const [userID, setUserID] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const [verificationPending, setVerificationPending] = useState(false);
  const [userCred, setUserCred] = useState({});
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  
  const [user, setUser] = useState({
    _id: "",
    googleid: "",
    email: "",
    name: "",
    profilePicture: "",
    firstName: "",
    lastName: ""
  });
  
  const [googleUser, setGoogleUser] = useState({
    googleid: "",
    email: "",
    name: ""
  });

  const API_BASE_URL = "https://proshare-backend-27b5d2fdd236.herokuapp.com/api";
  // For local development: const API_BASE_URL = "http://localhost:4000/api";

  // Initialize Socket.io
  useEffect(() => {
    if (authorized && user.googleid) {
      const newSocket = io("https://proshare-backend-27b5d2fdd236.herokuapp.com", {
        transports: ['websocket', 'polling']
      });
      // For local: const newSocket = io("http://localhost:4000");

      newSocket.on("connect", () => {
        newSocket.emit("join", user.googleid);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [authorized, user.googleid]);

  // Helper function to normalize URLs
  const normalizeUrl = (url) => {
    if (!url) return url;
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return trimmedUrl;
    
    if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
      return trimmedUrl;
    }
    
    if (trimmedUrl.includes('.com')) {
      return `https://${trimmedUrl}`;
    }
    
    return trimmedUrl;
  };

  useEffect(() => {
    authListener();
    getAllUsers();
  }, []);

  const authListener = async () => {
    firebase.auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const providerId = firebaseUser.providerData[0]?.providerId;
        const isEmailPassword = providerId === 'password';

        // Gate email/password users until their email is verified
        if (isEmailPassword && !firebaseUser.emailVerified) {
          setVerificationPending(true);
          setAuthorized(false);
          // Expose the email so the verification screen can display it
          setUser(prev => ({ ...prev, email: firebaseUser.email }));
          return;
        }
        setVerificationPending(false);

        // Google users: use their Google OAuth ID (existing behavior)
        // Email/password users: use Firebase UID (stable, doesn't change with email changes)
        const userid = isEmailPassword
          ? firebaseUser.uid
          : (firebaseUser.multiFactor?.user?.providerData?.[0]?.uid || firebaseUser.uid);

        setGoogleUser({
          googleid: userid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
        });
        setUserID({ userID: userid });

        try {
          const person = await axios.get(`${API_BASE_URL}/users/${userid}`);
          if (person.data && person.data.length > 0) {
            setUser(person.data[0]);
            setAuthorized(true);
          } else if (isEmailPassword) {
            // Email/password user verified but missing from DB (backend creation failed at sign-up)
            try {
              const newUser = await axios.post(`${API_BASE_URL}/users`, {
                googleid: userid,
                email: firebaseUser.email,
                name: firebaseUser.displayName || firebaseUser.email,
                firstName: firebaseUser.displayName?.split(' ')[0] || '',
                lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || ''
              });
              setUser(newUser.data);
              setAuthorized(true);
            } catch (createErr) {
              console.log("Error creating user in DB:", createErr);
              setError("Failed to set up account. Please try again.");
            }
          }
        } catch (err) {
          console.log("Error fetching user:", err);
          setError("Failed to fetch user data");
        }
      } else {
        setVerificationPending(false);
        setAuthorized(false);
        setUser({
          _id: "",
          googleid: "",
          email: "",
          name: "",
          profilePicture: "",
          firstName: "",
          lastName: ""
        });
        setUserID({});
        setUserCred({});
      }
    });
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userCredentials = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
      
      if (userCredentials && allUsers) {
        setUserCred(userCredentials);
        
        const existingUser = allUsers.find(currentUser => 
          userCredentials.additionalUserInfo.profile.id === currentUser.googleid
        );

        if (existingUser) {
          setUser(existingUser);
          setAuthorized(true);
        } else {
          const newUserData = {
            googleid: userCredentials.additionalUserInfo.profile.id,
            email: userCredentials.additionalUserInfo.profile.email,
            name: userCredentials.additionalUserInfo.profile.name,
            firstName: userCredentials.additionalUserInfo.profile.given_name,
            lastName: userCredentials.additionalUserInfo.profile.family_name
          };
          
          await makeUser(newUserData);
          await getAllUsers();
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (socket) {
        socket.disconnect();
      }
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Logout error:", error);
      setError("Failed to logout");
    }
  };

  const handleEmailSignUp = async (firstName, lastName, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const creds = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await creds.user.updateProfile({ displayName: `${firstName} ${lastName}` });
      await creds.user.sendEmailVerification();
      // Create the DB record (best-effort — authListener will retry if this fails)
      try {
        await axios.post(`${API_BASE_URL}/users`, {
          googleid: creds.user.uid,
          email,
          name: `${firstName} ${lastName}`,
          firstName,
          lastName
        });
      } catch (backendErr) {
        console.log("Backend user creation failed:", backendErr);
      }
      setVerificationPending(true);
    } catch (err) {
      console.error("Sign up error:", err);
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // authListener handles the rest
    } catch (err) {
      console.error("Sign in error:", err);
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        await currentUser.sendEmailVerification();
      }
    } catch (err) {
      console.error("Error resending verification:", err);
      setError("Failed to resend verification email. Please try again.");
    }
  };

  const checkEmailVerification = async () => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        await currentUser.reload();
        if (currentUser.emailVerified) {
          const userid = currentUser.uid;
          setVerificationPending(false);
          setUserID({ userID: userid });
          const person = await axios.get(`${API_BASE_URL}/users/${userid}`);
          if (person.data && person.data.length > 0) {
            setUser(person.data[0]);
            setAuthorized(true);
          }
        } else {
          setError("Email not verified yet. Please check your inbox and click the link.");
        }
      }
    } catch (err) {
      console.error("Error checking verification:", err);
      setError("Error checking verification status. Please try again.");
    }
  };

  // Image Upload Functions
  async function uploadImage(file, type = 'profile') {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const endpoint = type === 'profile' ? 'profile-picture' : 'project-image';
      const response = await axios.post(
        `${API_BASE_URL}/upload/${endpoint}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      return response.data.url;
    } catch (err) {
      console.log("Error uploading image:", err);
      setError("Failed to upload image");
      throw err;
    }
  }

  async function updateUserProfilePicture(profilePicture) {
    try {
      let imageUrl = profilePicture;

      if (profilePicture instanceof File) {
        imageUrl = await uploadImage(profilePicture, 'profile');
      } else {
        imageUrl = normalizeUrl(profilePicture);
      }

      // Update state immediately so the avatar reflects the change right away.
      setUser(prev => ({ ...prev, profilePicture: imageUrl }));

      // Persist to DB (best-effort — upload already succeeded so don't block the user).
      try {
        await axios.put(`${API_BASE_URL}/users/`, {
          _id: user._id,
          profilePicture: imageUrl
        });
      } catch (putErr) {
        console.log("DB update failed after successful upload:", putErr);
        // Image is on Cloudinary and state is updated — user will see it correctly.
      }

      return imageUrl;
    } catch (err) {
      console.log("Error uploading profile picture:", err);
      setError("Failed to upload image. Please try again.");
      throw err;
    }
  }

  // Project Management Functions
  async function getAllProjects() {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/projects`);
      setProjects(response.data);
      return response.data;
    } catch (err) {
      console.log("Error fetching projects:", err);
      setError("Failed to fetch projects");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function getUserProjects(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/${userId}`);
      return response.data;
    } catch (err) {
      console.log("Error fetching user projects:", err);
      setError("Failed to fetch user projects");
      throw err;
    }
  }

  async function createProject(projectData) {
    try {
      let pictureUrl = projectData.picture;
      
      // Handle file upload for project picture
      if (projectData.picture instanceof File) {
        pictureUrl = await uploadImage(projectData.picture, 'project');
      } else {
        pictureUrl = normalizeUrl(projectData.picture);
      }

      const normalizedProject = {
        ...projectData,
        picture: pictureUrl,
        github: normalizeUrl(projectData.github),
        deployedLink: normalizeUrl(projectData.deployedLink),
        backendRepo: normalizeUrl(projectData.backendRepo),
        backendDeploy: normalizeUrl(projectData.backendDeploy)
      };

      const response = await axios.post(`${API_BASE_URL}/projects`, normalizedProject);
      await getAllProjects();
      return response.data;
    } catch (err) {
      console.log("Error creating project:", err);
      await getAllProjects();
      return null;
    }
  }

  async function updateProject(projectData) {
    try {
      let pictureUrl = projectData.picture;
      
      // Handle file upload for project picture
      if (projectData.picture instanceof File) {
        pictureUrl = await uploadImage(projectData.picture, 'project');
      } else {
        pictureUrl = normalizeUrl(projectData.picture);
      }

      const normalizedProject = {
        ...projectData,
        picture: pictureUrl,
        github: normalizeUrl(projectData.github),
        deployedLink: normalizeUrl(projectData.deployedLink),
        backendRepo: normalizeUrl(projectData.backendRepo),
        backendDeploy: normalizeUrl(projectData.backendDeploy)
      };

      const response = await axios.put(`${API_BASE_URL}/projects`, normalizedProject);
      await getAllProjects();
      return response.data;
    } catch (err) {
      console.log("Error updating project:", err);
      await getAllProjects();
      return null;
    }
  }

  async function deleteProject(projectId) {
    try {
      await fetch(`${API_BASE_URL}/projects`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: projectId })
      });
      
      await getAllProjects();
    } catch (err) {
      console.log("Error deleting project:", err);
      await getAllProjects();
      throw err;
    }
  }

  // Message Functions
  async function getConversations() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/messages/conversations/${user.googleid}`
      );
      return response.data;
    } catch (err) {
      console.log("Error fetching conversations:", err);
      setError("Failed to fetch conversations");
      throw err;
    }
  }

  async function getMessages(conversationId) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/messages/conversation/${conversationId}`
      );
      return response.data;
    } catch (err) {
      console.log("Error fetching messages:", err);
      setError("Failed to fetch messages");
      throw err;
    }
  }

  async function sendMessage(receiverId, receiverName, text) {
    try {
      const response = await axios.post(`${API_BASE_URL}/messages`, {
        senderId: user.googleid,
        receiverId,
        senderName: user.name,
        text
      });

      const messageData = {
        ...response.data.message,
        timestamp: response.data.message.createdAt || new Date().toISOString(),
        id: response.data.message._id || response.data.message.id
      };

      if (socket) {
        socket.emit("sendMessage", {
          receiverId,
          message: messageData,
          conversationId: response.data.conversationId
        });
      }

      return {
        ...response.data,
        message: messageData
      };
    } catch (err) {
      console.log("Error sending message:", err);
      // Don't set global error for message sending failures
      // Let the Messaging component handle it locally
      throw err;
    }
  }

  async function markMessagesAsRead(conversationId) {
    try {
      await axios.put(`${API_BASE_URL}/messages/read`, {
        conversationId,
        userId: user.googleid
      });
    } catch (err) {
      console.log("Error marking messages as read:", err);
    }
  }

  // User Management Functions
  async function makeUser(person) {
    try {
      const newUser = await axios.post(`${API_BASE_URL}/users`, person);
      setUser(newUser.data);
      setAuthorized(true);
    } catch (err) {
      console.log("Error creating user:", err);
      setError("Failed to create user");
    }
  }

  async function getAllUsers() {
    try {
      const allUser = await axios.get(`${API_BASE_URL}/users`);
      setAllUsers(allUser.data);
    } catch (err) {
      console.log("Error fetching all users:", err);
      setError("Failed to fetch users");
    }
  }

  async function getUserByID(userID) {
    try {
      const person = await axios.get(`${API_BASE_URL}/users/${userID.userID}`);
      if (person.data && person.data.length > 0) {
        setUser(person.data[0]);
      }
    } catch (err) {
      console.log("Error fetching user by ID:", err);
      setError("Failed to fetch user");
    }
  }

  // Comment Management
  async function addCommentToProject(projectId, comments, newComment) {
    try {
      const commentObj = {
        text: newComment,
        author: user.name || 'Anonymous',
        timestamp: new Date().toISOString()
      };
      const allComments = [...comments, commentObj];
      const combinedComments = {
        _id: projectId,
        comments: allComments
      };
      
      const response = await axios.put(`${API_BASE_URL}/projects`, combinedComments);
      await getAllProjects();
      return response.data;
    } catch (err) {
      console.log("Error adding comment:", err);
      await getAllProjects();
      return null;
    }
  }

  const clearError = () => {
    setError(null);
  };

  const contextValue = {
    // State
    user,
    setUser,
    userID,
    setUserID,
    allUsers,
    setAllUsers,
    authorized,
    setAuthorized,
    userCred,
    setUserCred,
    googleUser,
    setGoogleUser,
    projects,
    setProjects,
    loading,
    error,
    socket,
    
    // Auth state
    verificationPending,
    setVerificationPending,

    // Auth functions
    handleGoogleLogin,
    handleLogout,
    handleEmailSignUp,
    handleEmailSignIn,
    resendVerificationEmail,
    checkEmailVerification,
    getUserByID,
    updateUserProfilePicture,
    uploadImage,
    
    // Project functions
    getAllProjects,
    getUserProjects,
    createProject,
    updateProject,
    deleteProject,
    addCommentToProject,
    
    // Message functions
    getConversations,
    getMessages,
    sendMessage,
    markMessagesAsRead,
    
    // Utility
    clearError,
    normalizeUrl,
    API_BASE_URL
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <App />
      </Router>
    </AppContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppProvider />);