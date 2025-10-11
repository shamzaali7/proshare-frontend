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

export const AppContext = createContext();

function AppProvider() {
  const [userID, setUserID] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [authorized, setAuthorized] = useState(false);
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
        console.log("Socket connected");
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
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userid = user.multiFactor.user.providerData[0].uid;
        setGoogleUser({
          googleid: userid,
          email: user.multiFactor.user.email,
          name: user.multiFactor.user.displayName,
        });
        setUserID({ userID: userid });
        
        try {
          const person = await axios.get(`${API_BASE_URL}/users/${userid}`);
          if (person.data && person.data.length > 0) {
            setUser(person.data[0]);
            setAuthorized(true);
          }
        } catch (err) {
          console.log("Error fetching user:", err);
          setError("Failed to fetch user data");
        }
      } else {
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

      const updatedUser = await axios.put(`${API_BASE_URL}/users/`, {
        _id: user._id,
        profilePicture: imageUrl
      });
      
      if (updatedUser.data) {
        setUser({ ...user, profilePicture: updatedUser.data.profilePicture });
        return updatedUser.data;
      }
    } catch (err) {
      console.log("Error updating profile picture:", err);
      setError("Failed to update profile picture. Please try again.");
      throw err;
    }
  }

  // Project Management Functions
  async function getAllProjects() {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects`);
      setProjects(response.data);
      return response.data;
    } catch (err) {
      console.log("Error fetching projects:", err);
      setError("Failed to fetch projects");
      throw err;
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
      setError("Failed to send message");
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
      const allComments = [...comments, newComment];
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
    
    // Auth functions
    handleGoogleLogin,
    handleLogout,
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