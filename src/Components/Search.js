import React, { useEffect, useContext } from 'react';
import { AppContext } from '../index';
import ProjectCard from './ProjectCard';
import CommentModal from './CommentModal';

function Search({
  dropDown,
  setDropDown,
  addCommentModal,
  handleAddCommentModal,
  comment,
  handleCommentChange,
  currentProject,
  setCurrentProject,
  filteredProjects,
  setFilteredProjects,
  searchInput,
  setSearchInput
}) {
  const { 
    projects, 
    allUsers, 
    getAllProjects, 
    addCommentToProject,
    loading,
    error,
    user
  } = useContext(AppContext);

  useEffect(() => {
    getAllProjects();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    
    if (value.trim() === '') {
      setFilteredProjects([]);
    } else {
      const filtered = projects.filter((project) => 
        project.title.toLowerCase().includes(value.toLowerCase()) ||
        project.creator.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    try {
      await addCommentToProject(currentProject._id, currentProject.comments, comment);
      handleAddCommentModal(); // This will clear the comment and current project
      
      // Update filtered projects if search is active
      if (searchInput.trim()) {
        const updated = projects.filter((project) => 
          project.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          project.creator.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredProjects(updated);
      }
    } catch (err) {
      console.log("Error adding comment:", err);
    }
  };

  const handleProjectCommentClick = (project) => {
    setCurrentProject({ _id: project._id, comments: project.comments });
    handleAddCommentModal();
  };

  // Check if user owns the project
  const isProjectOwner = (project) => {
    return user.googleid === project.gid;
  };

  return (
    <div className="mt-0 font-change">
      <div className="search-projects">
        <div></div>
        <div>
          <form onSubmit={(e) => e.preventDefault()}>   
            <label htmlFor="default-search" className="pb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="search-field">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <div>
                  <input 
                    onChange={handleSearchChange} 
                    value={searchInput}
                    type="search" 
                    id="default-search" 
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Search Projects by title or creator" 
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div></div>
      </div>
      
      <div className="search-display my-10">
        <div></div>
        
        {loading && (
          <div className="text-center text-gray-500">
            Loading projects...
          </div>
        )}
        
        {error && (
          <div className="text-center text-red-600">
            {error}
          </div>
        )}
        
        {!loading && searchInput.trim() && filteredProjects.length === 0 && (
          <div className="text-center text-gray-500">
            No projects found matching "{searchInput}"
          </div>
        )}
        
        {!loading && !searchInput.trim() && (
          <div className="text-center text-gray-500">
            Enter a search term to find projects
          </div>
        )}
        
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project._id || index}
            project={project}
            allUsers={allUsers}
            dropDown={dropDown}
            setDropDown={setDropDown}
            onCommentClick={() => handleProjectCommentClick(project)}
            showActions={false}
            isOwner={isProjectOwner(project)}
          />
        ))}
        
        <div></div>
      </div>
      
      <CommentModal
        isOpen={addCommentModal}
        onClose={handleAddCommentModal}
        onSubmit={handleAddComment}
        comment={comment}
        onCommentChange={handleCommentChange}
      />
    </div>
  );
}

export default Search;