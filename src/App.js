import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppContext } from './index';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Profile from './Components/Profile';
import IDE from './Components/IDE';
import Search from './Components/Search';

function App() {
  const { user, userID, allUsers, authorized, userCred, error, clearError } = useContext(AppContext);
  
  // UI State
  const [dropDown, setDropDown] = useState(true);
  const [currentProject, setCurrentProject] = useState({});
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  
  // Modal states
  const [addCommentModal, setAddCommentModal] = useState(false);
  const [comment, setComment] = useState("");
  
  // Header-specific state
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);

  // Modal handlers
  const handleAddCommentModal = () => {
    setAddCommentModal(!addCommentModal);
    if (addCommentModal) {
      setComment("");
      setCurrentProject({});
    }
  };

  const handleDropDownModal = () => {
    setDropDown(!dropDown);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Header handlers
  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
    if (!showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleProfileDropdownToggle = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleProfilePictureModalToggle = () => {
    setShowProfilePictureModal(!showProfilePictureModal);
    setShowProfileDropdown(false);
  };

  // Search handlers
  const handleSearchInputChange = (value) => {
    setSearchInput(value);
  };

  const handleFilteredProjectsChange = (filteredProjects) => {
    setFilteredProjects(filteredProjects);
  };

  // Project handlers
  const handleSetCurrentProject = (project) => {
    setCurrentProject(project);
  };

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "auto";
    }
  }, [showMobileMenu]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <div className="App">
      {error && (
        <div className="error-banner bg-red-500 text-white p-4 text-center">
          {error}
          <button onClick={clearError} className="ml-4 underline">
            Dismiss
          </button>
        </div>
      )}
      
      <Header 
        showMobileMenu={showMobileMenu}
        showProfileDropdown={showProfileDropdown}
        showProfilePictureModal={showProfilePictureModal}
        onMobileMenuToggle={handleMobileMenuToggle}
        onProfileDropdownToggle={handleProfileDropdownToggle}
        onProfilePictureModalToggle={handleProfilePictureModalToggle}
      />
      
      <Footer />
      
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                dropDown={dropDown}
                setDropDown={setDropDown}
                addCommentModal={addCommentModal}
                handleAddCommentModal={handleAddCommentModal}
                comment={comment}
                handleCommentChange={handleCommentChange}
                currentProject={currentProject}
                setCurrentProject={handleSetCurrentProject}
              />
            } 
          />
          <Route 
            path="/accounts" 
            element={
              <Profile 
                dropDown={dropDown} 
                handleDropDownModal={handleDropDownModal}
              />
            } 
          />
          <Route path="/ide" element={<IDE />} />
          <Route 
            path="/search" 
            element={
              <Search 
                dropDown={dropDown}
                setDropDown={setDropDown}
                addCommentModal={addCommentModal}
                handleAddCommentModal={handleAddCommentModal}
                comment={comment}
                handleCommentChange={handleCommentChange}
                currentProject={currentProject}
                setCurrentProject={handleSetCurrentProject}
                filteredProjects={filteredProjects}
                setFilteredProjects={handleFilteredProjectsChange}
                searchInput={searchInput}
                setSearchInput={handleSearchInputChange}
              />
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;