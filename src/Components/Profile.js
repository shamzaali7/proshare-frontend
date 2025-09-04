import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../index';
import ProjectCard from './ProjectCard';
import ProjectFormModal from './ProjectFormModal';

function Profile({ dropDown, handleDropDownModal }) {
  const { 
    user,
    userID, 
    userCred, 
    authorized, 
    getUserProjects,
    createProject,
    updateProject,
    deleteProject,
    loading,
    error 
  } = useContext(AppContext);

  const [userProjects, setUserProjects] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  
  const [form, setForm] = useState({
    title: "",
    github: "",
    deployedLink: "",
    picture: "",
    gid: userID.userID,
    backendRepo: "",
    backendDeploy: "",
    creator: userCred?.additionalUserInfo?.profile?.name || user.name
  });
  
  const [formPut, setFormPut] = useState({
    _id: "",
    title: "",
    github: "",
    deployedLink: "",
    picture: "",
    gid: userID.userID,
    backendRepo: "",
    backendDeploy: "",
    creator: userCred?.additionalUserInfo?.profile?.name || user.name
  });
  
  const [formDelete, setFormDelete] = useState({ _id: "" });

  useEffect(() => {
    if (authorized && userID.userID) {
      loadUserProjects();
    }
  }, [authorized, userID.userID]);

  const loadUserProjects = async () => {
    try {
      const projects = await getUserProjects(userID.userID);
      setUserProjects(projects);
    } catch (err) {
      console.log("Error loading user projects:", err);
    }
  };

  // Modal handlers
  const handleModalState = () => {
    setModal(!modal);
    if (modal) {
      resetForm();
    }
  };
  
  const handlePutModalState = () => {
    setModalTwo(!modalTwo);
  };
  
  const handleDeleteModalState = () => {
    setModalDelete(!modalDelete);
  };

  // Form handlers
  const editForm = (value) => {
    setForm(prev => ({ ...prev, ...value }));
  };
  
  const editFormTwo = (value) => {
    setFormPut(prev => ({ ...prev, ...value }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      github: "",
      deployedLink: "",
      picture: "",
      gid: userID.userID,
      backendRepo: "",
      backendDeploy: "",
      creator: userCred?.additionalUserInfo?.profile?.name || user.name
    });
  };

  // CRUD operations
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(form);
      handleModalState();
      await loadUserProjects();
    } catch (err) {
      console.log("Error creating project:", err);
    }
  };
  
  const handlePutSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProject(formPut);
      handlePutModalState();
      await loadUserProjects();
    } catch (err) {
      console.log("Error updating project:", err);
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteProject(formDelete._id);
      handleDeleteModalState();
      await loadUserProjects();
    } catch (err) {
      console.log("Error deleting project:", err);
    }
  };

  const handleEditProject = (project) => {
    setFormPut({
      _id: project._id,
      title: project.title,
      github: project.github,
      deployedLink: project.deployedLink,
      backendRepo: project.backendRepo || "",
      backendDeploy: project.backendDeploy || "",
      picture: project.picture,
      gid: project.gid,
      creator: project.creator
    });
    handlePutModalState();
  };

  const handleDeleteProject = (project) => {
    setFormDelete({ _id: project._id });
    handleDeleteModalState();
  };

  // Body overflow management
  useEffect(() => {
    if (modal || modalTwo || modalDelete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modal, modalTwo, modalDelete]);

  if (!authorized) {
    return (
      <div className="breach">
        Please Sign In
      </div>
    );
  }

  return (
    <div className="container-home font-change">
      <div className="container-new-project">
        <div></div>
        <div className="explore">My Projects</div>
        <div className="explore">
          <button onClick={handleModalState} className="new-project">
            New Project
          </button>
        </div>
      </div>
      
      {loading && userProjects.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          Loading your projects...
        </div>
      )}
      
      {error && (
        <div className="text-center text-red-600 mt-10">
          {error}
        </div>
      )}
      
      {!loading && userProjects.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          You haven't created any projects yet. Click "New Project" to get started!
        </div>
      )}

      {userProjects.map((project, index) => (
        <div key={project._id || index} className="container-spacer">
          <div></div>
          <ProjectCard
            project={project}
            allUsers={[]} // Not needed for user's own projects
            dropDown={dropDown}
            setDropDown={handleDropDownModal}
            showActions={true}
            onEdit={() => handleEditProject(project)}
            onDelete={() => handleDeleteProject(project)}
            isOwner={true}
          />
          <div></div>
        </div>
      ))}

      {/* Create Project Modal */}
      <ProjectFormModal
        isOpen={modal}
        onClose={handleModalState}
        onSubmit={handleSubmit}
        form={form}
        onFormChange={editForm}
        title="Create New Project"
        submitText="Post"
      />

      {/* Edit Project Modal */}
      <ProjectFormModal
        isOpen={modalTwo}
        onClose={handlePutModalState}
        onSubmit={handlePutSubmit}
        form={formPut}
        onFormChange={editFormTwo}
        title="Update Project"
        submitText="Submit"
        isEdit={true}
      />

      {/* Delete Confirmation Modal */}
      {modalDelete && (
        <div className="modal">
          <div onClick={handleDeleteModalState} className="overlay"></div>
          <div className="modal-content">
            <form onSubmit={handleDeleteSubmit}>
              <div className="delete-modal-question">
                Are you sure you want to delete this project? This action cannot be undone.
              </div>
              <div className="flex gap-2 mt-4">
                <button 
                  type="submit"
                  className="btn-delete-project"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
                <button 
                  type="button"
                  onClick={handleDeleteModalState} 
                  className="close-modal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>             
        </div>
      )}
    </div>
  );
}

export default Profile;