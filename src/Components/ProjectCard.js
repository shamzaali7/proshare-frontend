import React from 'react';
import '../Styling/ProjectCard.css';

function normalizeComment(c) {
  if (typeof c === 'string') return { text: c, author: null };
  return c;
}

function ProjectCard({
  project,
  allUsers,
  onCommentClick,   // opens the comment modal (viewer + adder)
  showActions = false,
  onEdit,
  onDelete,
  isOwner = false
}) {
  const getProjectCreatorImage = () => {
    if (showActions || !allUsers) return null;
    const creator = allUsers.find(p => p.googleid === project.gid);
    return creator?.profilePicture;
  };

  // Last 2 comments (chronological order means last 2 are newest)
  const rawComments = (project.comments || []).filter(Boolean);
  const normalized = rawComments.map(normalizeComment).filter(c => c.text);
  const preview = normalized.slice(-2);
  const totalCount = normalized.length;

  return (
    <div className="project-card-container">
      <div></div>
      <div className="project-card">

        {/* ── Title row ── */}
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

        {/* ── Main showcase row ── */}
        <div className="project-showcase">

          {/* Links column */}
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
                  {showActions ? 'Frontend Repo' : 'Repo'}
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

          {/* Image column */}
          <div className="project-image-container">
            <img className="project-image" src={project.picture} alt="Project screenshot" />
          </div>

          {/* Comments column */}
          <div className="project-comments-section">

            {/* "Comments (n)" button */}
            <div className="project-comments-button-container">
              <div></div>
              <div className="project-comments-button-content">
                <button
                  onClick={onCommentClick}
                  className="project-comments-button"
                >
                  <svg className="comment-btn-icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-4 4-1-4z"></path>
                  </svg>
                  Comments{totalCount > 0 ? ` (${totalCount})` : ''}
                </button>
              </div>
              <div></div>
            </div>

            {/* Preview: last 2 comments */}
            <div className="project-comments-preview">
              <div></div>
              <div className="project-comments-preview-list">
                {preview.length === 0 ? (
                  <span className="project-comment-preview-empty">No comments yet</span>
                ) : (
                  preview.map((c, i) => (
                    <div key={i} className="project-comment-preview">
                      {c.author && (
                        <span className="project-comment-preview-author">{c.author}:</span>
                      )}
                      <span className="project-comment-preview-text">{c.text}</span>
                    </div>
                  ))
                )}
                {totalCount > 2 && (
                  <button
                    onClick={onCommentClick}
                    className="project-comments-view-all"
                  >
                    View all {totalCount} comments
                  </button>
                )}
              </div>
              <div></div>
            </div>

          </div>
        </div>

        {/* Owner edit/delete actions */}
        {showActions && (
          <div className="project-actions">
            <button className="project-update-button" onClick={onEdit}>Update</button>
            <button className="project-delete-button" onClick={onDelete}>Delete</button>
          </div>
        )}

      </div>
      <div></div>
    </div>
  );
}

export default ProjectCard;
