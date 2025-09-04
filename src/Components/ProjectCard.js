import React from 'react';

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
    if (isOwner || !allUsers) return null;
    
    const creator = allUsers.find(person => person.googleid === project.gid);
    return creator?.profilePicture;
  };

  return (
    <div className="container-spacer">
      <div></div>
      <div className="home-projects shadow-xl">
        <div className="container-title">
          <div></div>
          <div className="project-titles-box">
            <p className="project-titles bg-white">{project.title}</p>
          </div>
          {!isOwner && (
            <div className="project-creator">
              <div></div>
              <div className="box-project-creator">
                <span className="mr-1">by: {project.creator}</span>
                {getProjectCreatorImage() && (
                  <img 
                    className="rounded-full h-10 w-10 object-cover" 
                    src={getProjectCreatorImage()} 
                    alt="creator" 
                  />
                )}
              </div>
              <div></div>
            </div>
          )}
          {isOwner && <div></div>}
        </div>
        
        <div className="home-showcase">
          <div className="container-showcase">
            <div>
              <div className="container-deployed">
                <div></div>
                <div className="home-deployed">
                  <a href={project.deployedLink} target="_blank" rel="noreferrer">
                    <p className="side-elements links">Deployed Site</p>
                  </a>
                </div>
                <div></div>
              </div>
              
              <div className="container-repo">
                <div></div>
                <div className="home-repo">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <p className="side-elements slink">
                      {isOwner ? "Frontend Repo" : "Repo"}
                    </p>
                  </a>
                </div>
                <div></div>
              </div>
              
              {isOwner && project.backendRepo && (
                <>
                  <div className="container-back-link">
                    <div></div>
                    <div className="home-deployedLink">
                      <a href={project.backendDeploy} target="_blank" rel="noreferrer">
                        <p className="side-elements slink">Deployed Back</p>
                      </a>
                    </div>
                    <div></div>
                  </div>
                  <div className="container-back-repo">
                    <div></div>
                    <div className="home-repo">
                      <a href={project.backendRepo} target="_blank" rel="noreferrer">
                        <p className="side-elements slink">Backend Repo</p>
                      </a>
                    </div>
                    <div></div>
                  </div>
                </>
              )}
            </div>
            
            <div className="box-showcase">
              <img className="project-pic" src={project.picture} alt="Project screenshot" />
            </div>
            
            <div className="home-comments">
              <div className="container-comment-btn">
                <div></div>
                <div className="box-comment-btn">
                  <button 
                    onClick={setDropDown} 
                    className="side-elements slink focus:ring-2 focus:outline-none focus:ring-grey-700 font-medium rounded-lg text-sm px-1 py-.5 text-center inline-flex items-center dark:hover:bg-grey-700 dark:focus:ring-grey-800"
                  >
                    Comments 
                    <svg className="w-3 h-3" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>
                <div></div>
              </div>
              
              <div className="container-dropdown">
                <div></div>
                {dropDown && (
                  <div className="comments-display items-center divide-y divide-gray-100 shadow rounded dark:bg-gray-600 cursor-default">          
                    {project.comments && project.comments.length > 0 ? (
                      project.comments.map((comment, index) => (
                        comment && (
                          <span 
                            key={index}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-slate-300 text-slate-50 text-xs"
                          >
                            {comment}
                          </span>
                        )
                      ))
                    ) : (
                      <span className="block px-4 py-2 text-slate-50 text-xs">
                        No comments yet
                      </span>
                    )}
                  </div>
                )}
                <div></div>
              </div>
              
              {!isOwner && (
                <div className="container-add-btn">
                  <div></div>
                  <div className="add-btn">
                    <button 
                      onClick={onCommentClick} 
                      className="text-sm"
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
            <div className="change-buttons">
              <button 
                className="btn-update-project" 
                onClick={onEdit}
              >
                Update
              </button>
              <button 
                className="btn-delete-project" 
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default ProjectCard;