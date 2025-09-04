import React from 'react';
import './ProjectCard.css';

function ProjectCard({ 
  project, 
  allUsers, 
  dropDown, 
  setDropDown, 
  onCommentClick, 
  showActions = false,
  onEdit,
  onDelete,
  isOwner = false 
}) {
  const getProjectCreatorImage = () => {
    if (showActions || !allUsers) return null;
    
    const creator = allUsers.find(person => person.googleid === project.gid);
    return creator?.profilePicture;
  };

  return (
    <div className="project-card-container">
      <div></div>
      <div className="project-card">
        <div className="project-card-title">
          <div></div>
          <div>
            <p className="project-title-text">{project.title}</p>
          </div>
          {!showActions && (
            <div className="project-creator-section">
              <div></div>
              <div className="project-creator-content">
                <span className="project-creator-name">by: {project.creator}</span>
                {getProjectCreatorImage() && (
                  <img 
                    className="project-creator-avatar" 
                    src={getProjectCreatorImage()} 
                    alt="creator" 
                  />
                )}
              </div>
              <div></div>
            </div>
          )}
          {showActions && <div></div>}
        </div>
        
        <div className="project-showcase">
          <div className="project-links">
            <div className="project-link-container">
              <div></div>
              <div className="project-link-content">
                <a href={project.deployedLink} target="_blank" rel="noreferrer" className="project-link">
                  Deployed Site
                </a>
              </div>
              <div></div>
            </div>
            
            <div className="project-link-container">
              <div></div>
              <div className="project-link-content">
                <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
                  {showActions ? "Frontend Repo" : "Repo"}
                </a>
              </div>
              <div></div>
            </div>
            
            {showActions && project.backendRepo && (
              <>
                <div className="project-link-container">
                  <div></div>
                  <div className="project-link-content">
                    <a href={project.backendDeploy} target="_blank" rel="noreferrer" className="project-link">
                      Deployed Back
                    </a>
                  </div>
                  <div></div>
                </div>
                <div className="project-link-container">
                  <div></div>
                  <div className="project-link-content">
                    <a href={project.backendRepo} target="_blank" rel="noreferrer" className="project-link">
                      Backend Repo
                    </a>
                  </div>
                  <div></div>
                </div>
              </>
            )}
          </div>
          
          <div className="project-image-container">
            <img className="project-image" src={project.picture} alt="Project screenshot" />
          </div>
          
          <div className="project-comments-section">
            <div className="project-comments-button-container">
              <div></div>
              <div className="project-comments-button-content">
                <button 
                  onClick={setDropDown} 
                  className="project-comments-button"
                >
                  Comments 
                  <svg className="w-3 h-3" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
              </div>
              <div></div>
            </div>
            
            <div className="project-comments-dropdown">
              <div></div>
              {dropDown && (
                <div className="project-comments-list">          
                  {project.comments && project.comments.length > 0 ? (
                    project.comments.map((comment, index) => (
                      comment && (
                        <span 
                          key={index}
                          className="project-comment"
                        >
                          {comment}
                        </span>
                      )
                    ))
                  ) : (
                    <span className="project-comment">
                      No comments yet
                    </span>
                  )}
                </div>
              )}
              <div></div>
            </div>
            
            {!isOwner && !showActions && (
              <div className="project-add-comment-container">
                <div></div>
                <div>
                  <button 
                    onClick={onCommentClick} 
                    className="project-add-comment-button"
                    title="Add comment"
                  >
                    +
                  </button>
                </div>
                <div></div>
              </div>
            )}
          </div>
        </div>
        
        {showActions && (
          <div className="project-actions">
            <button 
              className="project-update-button" 
              onClick={onEdit}
            >
              Update
            </button>
            <button 
              className="project-delete-button" 
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
}

export default ProjectCard;