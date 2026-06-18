import React, { useEffect, useContext } from 'react';
import { AppContext } from '../index';
import ProjectCard from './ProjectCard';
import CommentModal from './CommentModal';

function Home({
  addCommentModal,
  handleAddCommentModal,
  comment,
  handleCommentChange,
  currentProject,
  setCurrentProject
}) {
  const {
    projects,
    allUsers,
    getAllProjects,
    addCommentToProject,
    loading,
    error,
    user,
    authorized
  } = useContext(AppContext);

  useEffect(() => {
    getAllProjects();
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await addCommentToProject(currentProject._id, currentProject.comments, comment);
      handleAddCommentModal();
    } catch (err) {
      console.log('Error adding comment:', err);
      handleAddCommentModal();
    }
  };

  const handleProjectCommentClick = (project) => {
    setCurrentProject(project);
    handleAddCommentModal();
  };

  if (loading && projects.length === 0) {
    return (
      <div className="container-home font-change">
        <div className="spinner-container">
          <div className="spinner"></div>
          <div className="spinner-text">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-home font-change">
      <div className="explore">Explore</div>

      {error && (
        <div className="text-center text-red-600 mb-4">{error}</div>
      )}

      {projects.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No projects available</div>
      ) : (
        projects.map((project, index) => (
          <ProjectCard
            key={project._id || index}
            project={project}
            allUsers={allUsers}
            onCommentClick={() => handleProjectCommentClick(project)}
            showActions={false}
            isOwner={user.googleid === project.gid}
          />
        ))
      )}

      <CommentModal
        isOpen={addCommentModal}
        onClose={handleAddCommentModal}
        onSubmit={handleAddComment}
        comment={comment}
        onCommentChange={handleCommentChange}
        project={currentProject}
        authorized={authorized && user.googleid !== currentProject?.gid}
      />
    </div>
  );
}

export default Home;
