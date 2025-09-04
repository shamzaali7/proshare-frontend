import React from 'react';

function ProjectFormModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  form, 
  onFormChange, 
  title, 
  submitText,
  isEdit = false,
  loading = false
}) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const validateUrl = (url) => {
    if (!url) return true; // Allow empty URLs for optional fields
    
    // Remove protocol for validation
    const urlWithoutProtocol = url.replace(/^https?:\/\//, '');
    
    // Check if it contains .com or is a valid URL pattern
    return urlWithoutProtocol.includes('.com') || 
           urlWithoutProtocol.match(/^[\w-]+(\.[\w-]+)+/);
  };

  const isFormValid = () => {
    return form.title.trim() &&
           form.github.trim() &&
           form.deployedLink.trim() &&
           form.picture.trim() &&
           validateUrl(form.github) &&
           validateUrl(form.deployedLink) &&
           validateUrl(form.picture) &&
           validateUrl(form.backendRepo) &&
           validateUrl(form.backendDeploy);
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
              disabled={loading}
            />
          </div>
          
          <div className="input-box">
            <h3 className="input-lbl">Front-End Repo</h3>
            <input 
              type="text" 
              className="input-form" 
              value={form.github}
              onChange={(e) => onFormChange({ github: e.target.value })}
              placeholder="github.com/username/repo or https://github.com/username/repo"
              required
              disabled={loading}
            />
            {form.github && !validateUrl(form.github) && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid URL (must contain .com)</p>
            )}
          </div>
          
          <div className="input-box">
            <h3 className="input-lbl">Front-End Site</h3>
            <input 
              type="text" 
              className="input-form" 
              value={form.deployedLink}
              onChange={(e) => onFormChange({ deployedLink: e.target.value })}
              placeholder="yoursite.com or https://yoursite.com"
              required
              disabled={loading}
            />
            {form.deployedLink && !validateUrl(form.deployedLink) && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid URL (must contain .com)</p>
            )}
          </div>
          
          <div className="input-box">
            <h3 className="input-lbl">Back-End Repo (Optional)</h3>
            <input 
              type="text" 
              className="input-form" 
              value={form.backendRepo}
              onChange={(e) => onFormChange({ backendRepo: e.target.value })}
              placeholder="github.com/username/repo or https://github.com/username/repo"
              disabled={loading}
            />
            {form.backendRepo && !validateUrl(form.backendRepo) && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid URL (must contain .com)</p>
            )}
          </div>
          
          <div className="input-box">
            <h3 className="input-lbl">Back-End Site (Optional)</h3>
            <input 
              type="text" 
              className="input-form" 
              value={form.backendDeploy}
              onChange={(e) => onFormChange({ backendDeploy: e.target.value })}
              placeholder="yourapi.com or https://yourapi.com"
              disabled={loading}
            />
            {form.backendDeploy && !validateUrl(form.backendDeploy) && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid URL (must contain .com)</p>
            )}
          </div>
          
          <div className="input-box mb-1">
            <h3 className="input-lbl">Picture Link</h3>
            <input 
              type="text" 
              className="input-form" 
              value={form.picture}
              onChange={(e) => onFormChange({ picture: e.target.value })}
              placeholder="imagehost.com/image.jpg or https://imagehost.com/image.jpg"
              required
              disabled={loading}
            />
            {form.picture && !validateUrl(form.picture) && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid URL (must contain .com)</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn-update-project"
            disabled={loading || !isFormValid()}
          >
            {submitText}
          </button>
        </form>
        
        <button 
          onClick={onClose} 
          className="close-modal"
          disabled={loading}
        >
          Exit
        </button>
      </div>             
    </div>
  );
}

export default ProjectFormModal;