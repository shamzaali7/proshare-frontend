import React from 'react';

function ProjectFormModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  form, 
  onFormChange, 
  title, 
  submitText,
  isEdit = false 
}) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="modal">
      <div onClick={onClose} className="overlay"></div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="title-form">{title}</div>
          
          <div className="input-box">
            <h3 className="input-lbl">Title</h3>
            <input 
              type="text" 
              className="input-form" 
              value={form.title}
              onChange={(e) => onFormChange({ title: e.target.value })}
              required
            />
          </div>
          
          <div className="input-box">
            <h3 className="input-lbl">Front-End Repo</h3>
            <input 
              type="url" 
              className="input-form" 
              value={form.github}
              onChange={(e) => onFormChange({ github: e.target.value })}
              placeholder="https://github.com/..."
              required
            />
          </div>
          
          <div className="input-box">
            <h3 className="input-lbl">Front-End Site</h3>
            <input 
              type="url" 
              className="input-form" 
              value={form.deployedLink}
              onChange={(e) => onFormChange({ deployedLink: e.target.value })}
              placeholder="https://..."
              required
            />
          </div>
          
          <div className="input-box">
            <h3 className="input-lbl">Back-End Repo (Optional)</h3>
            <input 
              type="url" 
              className="input-form" 
              value={form.backendRepo}
              onChange={(e) => onFormChange({ backendRepo: e.target.value })}
              placeholder="https://github.com/..."
            />
          </div>
          
          <div className="input-box">
            <h3 className="input-lbl">Back-End Site (Optional)</h3>
            <input 
              type="url" 
              className="input-form" 
              value={form.backendDeploy}
              onChange={(e) => onFormChange({ backendDeploy: e.target.value })}
              placeholder="https://..."
            />
          </div>
          
          <div className="input-box mb-1">
            <h3 className="input-lbl">Picture Link</h3>
            <input 
              type="url" 
              className="input-form" 
              value={form.picture}
              onChange={(e) => onFormChange({ picture: e.target.value })}
              placeholder="https://..."
              required
            />
          </div>
          
          <button type="submit" className="btn-update-project">
            {submitText}
          </button>
        </form>
        
        <button onClick={onClose} className="close-modal">
          Exit
        </button>
      </div>             
    </div>
  );
}

export default ProjectFormModal;