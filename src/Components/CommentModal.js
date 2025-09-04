import React from 'react';

function CommentModal({ isOpen, onClose, onSubmit, comment, onCommentChange }) {
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
          <div className="title-form">Enter comment below</div>
          <div className="input-box mb-1">
            <input 
              type="text" 
              className="input-form" 
              value={comment}
              onChange={onCommentChange}
              placeholder="Write your comment..."
              required
              autoFocus
            />
          </div>
          <button type="submit" className="btn-update-project">
            Submit
          </button>
        </form>
        <button onClick={onClose} className="close-modal">
          Exit
        </button>
      </div>             
    </div>
  );
}

export default CommentModal;