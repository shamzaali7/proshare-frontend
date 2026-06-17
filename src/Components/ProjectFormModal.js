import React, { useState, useEffect, useRef } from 'react';

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
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);

  // When the modal opens, seed the preview from any existing URL (edit mode).
  useEffect(() => {
    if (isOpen && typeof form.picture === 'string' && form.picture) {
      setImagePreview(form.picture);
    }
    if (!isOpen) {
      setImagePreview('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    onFormChange({ picture: file });
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e) => {
    onFormChange({ picture: e.target.value });
    setImagePreview(e.target.value);
  };

  const clearPicture = () => {
    onFormChange({ picture: '' });
    setImagePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validateUrl = (url) => {
    if (!url) return true;
    const urlWithoutProtocol = url.replace(/^https?:\/\//, '');
    return urlWithoutProtocol.includes('.com') ||
           !!urlWithoutProtocol.match(/^[\w-]+(\.[\w-]+)+/);
  };

  const pictureIsFile = form.picture instanceof File;
  const pictureIsUrl = typeof form.picture === 'string' && form.picture.trim();

  const isPictureValid = () => {
    if (pictureIsFile) return true;
    if (pictureIsUrl) return validateUrl(form.picture);
    return false;
  };

  const isFormValid = () => {
    return form.title.trim() &&
           form.github.trim() &&
           form.deployedLink.trim() &&
           isPictureValid() &&
           validateUrl(form.github) &&
           validateUrl(form.deployedLink) &&
           validateUrl(form.backendRepo) &&
           validateUrl(form.backendDeploy);
  };

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
              placeholder="github.com/username/repo"
              required
              disabled={loading}
            />
            {form.github && !validateUrl(form.github) && (
              <p className="validation-error">Please enter a valid URL (must contain .com)</p>
            )}
          </div>

          <div className="input-box">
            <h3 className="input-lbl">Front-End Site</h3>
            <input
              type="text"
              className="input-form"
              value={form.deployedLink}
              onChange={(e) => onFormChange({ deployedLink: e.target.value })}
              placeholder="yoursite.com"
              required
              disabled={loading}
            />
            {form.deployedLink && !validateUrl(form.deployedLink) && (
              <p className="validation-error">Please enter a valid URL (must contain .com)</p>
            )}
          </div>

          <div className="input-box">
            <h3 className="input-lbl">Back-End Repo (Optional)</h3>
            <input
              type="text"
              className="input-form"
              value={form.backendRepo}
              onChange={(e) => onFormChange({ backendRepo: e.target.value })}
              placeholder="github.com/username/repo"
              disabled={loading}
            />
            {form.backendRepo && !validateUrl(form.backendRepo) && (
              <p className="validation-error">Please enter a valid URL (must contain .com)</p>
            )}
          </div>

          <div className="input-box">
            <h3 className="input-lbl">Back-End Site (Optional)</h3>
            <input
              type="text"
              className="input-form"
              value={form.backendDeploy}
              onChange={(e) => onFormChange({ backendDeploy: e.target.value })}
              placeholder="yourapi.com"
              disabled={loading}
            />
            {form.backendDeploy && !validateUrl(form.backendDeploy) && (
              <p className="validation-error">Please enter a valid URL (must contain .com)</p>
            )}
          </div>

          <div className="input-box mb-1">
            <h3 className="input-lbl">Project Image</h3>

            {/* File upload */}
            <div style={{ marginBottom: '0.4rem' }}>
              <label style={{ cursor: loading ? 'not-allowed' : 'pointer' }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                  disabled={loading}
                />
                <span className="file-upload-button" style={{ opacity: loading ? 0.6 : 1 }}>
                  📁 Choose File
                </span>
              </label>
              {pictureIsFile && (
                <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
                  {form.picture.name}
                </span>
              )}
            </div>

            {/* OR divider */}
            <div style={{ textAlign: 'center', margin: '0.3rem 0', color: '#6b7280', fontSize: '0.85rem' }}>
              OR
            </div>

            {/* URL input */}
            <input
              type="text"
              className="input-form"
              value={pictureIsFile ? '' : (form.picture || '')}
              onChange={handleUrlChange}
              placeholder="https://imagehost.com/image.jpg"
              disabled={loading || pictureIsFile}
              style={{ opacity: pictureIsFile ? 0.45 : 1 }}
            />
            {pictureIsUrl && !validateUrl(form.picture) && (
              <p className="validation-error">Please enter a valid URL (must contain .com)</p>
            )}

            {/* Preview */}
            {imagePreview && (
              <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: '80px', borderRadius: '4px', border: '1px solid #e5e7eb', objectFit: 'cover' }}
                  onError={() => setImagePreview('')}
                />
                <button
                  type="button"
                  onClick={clearPicture}
                  style={{ display: 'block', margin: '0.2rem auto 0', fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', color: '#6b7280' }}
                  disabled={loading}
                >
                  Remove
                </button>
              </div>
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
