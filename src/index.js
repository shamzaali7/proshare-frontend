import React, { useState, useEffect, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Config/firebase-config';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import axios from 'axios';
import App from './App';

// Create context for global state
export const AppContext = createContext();

function AppProvider() {
  const [userID, setUserID] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const [userCred, setUserCred] = useState({});
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
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
        
        // Get user data from backend
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
        // User signed out
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
          // Create new user
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
      await firebase.auth().signOut();
      // authListener will handle state cleanup
    } catch (error) {
      console.error("Logout error:", error);
      setError("Failed to logout");
    }
  };

  // Project Management Functions
  async function getAllProjects() {
    setLoading(true);
    setError(null);
    
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
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/${userId}`);
      return response.data;
    } catch (err) {
      console.log("Error fetching user projects:", err);
      setError("Failed to fetch user projects");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function createProject(projectData) {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/projects`, projectData);
      return response.data;
    } catch (err) {
      console.log("Error creating project:", err);
      setError("Failed to create project");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function updateProject(projectData) {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.put(`${API_BASE_URL}/projects`, projectData);
      return response.data;
    } catch (err) {
      console.log("Error updating project:", err);
      setError("Failed to update project");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function deleteProject(projectId) {
    setLoading(true);
    setError(null);
    
    try {
      await fetch(`${API_BASE_URL}/projects`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: projectId })
      });
    } catch (err) {
      console.log("Error deleting project:", err);
      setError("Failed to delete project");
      throw err;
    } finally {
      setLoading(false);
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

  async function updateUserProfilePicture(profilePicture) {
    try {
      const updatedUser = await axios.put(`${API_BASE_URL}/users/`, {
        _id: user._id,
        profilePicture: profilePicture
      });
      setUser({ ...user, profilePicture: updatedUser.data.profilePicture });
      return updatedUser.data;
    } catch (err) {
      console.log("Error updating profile picture:", err);
      setError("Failed to update profile picture");
      throw err;
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
      await axios.put(`${API_BASE_URL}/projects`, combinedComments);
      await getAllProjects(); // Refresh projects
    } catch (err) {
      console.log("Error adding comment:", err);
      setError("Failed to add comment");
      throw err;
    }
  }

  // Clear error function
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
    
    // Auth functions
    handleGoogleLogin,
    handleLogout,
    getUserByID,
    updateUserProfilePicture,
    
    // Project functions
    getAllProjects,
    getUserProjects,
    createProject,
    updateProject,
    deleteProject,
    addCommentToProject,
    
    // Utility
    clearError,
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