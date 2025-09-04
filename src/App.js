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
  
  const [dropDown, setDropDown] = useState(true);
  const [currentProject, setCurrentProject] = useState({});
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  
  const [addCommentModal, setAddCommentModal] = useState(false);
  const [comment, setComment] = useState("");
  
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);

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

  const handleSearchInputChange = (value) => {
    setSearchInput(value);
  };

  const handleFilteredProjectsChange = (filteredProjects) => {
    setFilteredProjects(filteredProjects);
  };

  const handleSetCurrentProject = (project) => {
    setCurrentProject(project);
  };

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "auto";
    }
  }, [showMobileMenu]);

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
        <div className="error-banner">
          {error}
          <button onClick={clearError}>
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