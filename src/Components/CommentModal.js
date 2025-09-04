import React, { useState } from 'react';

function CommentModal({ isOpen, onClose, onSubmit, comment, onCommentChange }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(e);
    } finally {
      setIsSubmitting(false);
    }
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
              disabled={isSubmitting}
            />
          </div>
          <button 
            type="submit" 
            className="btn-update-project"
            disabled={isSubmitting || !comment.trim()}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
        <button 
          onClick={onClose} 
          className="close-modal"
          disabled={isSubmitting}
        >
          Exit
        </button>
      </div>             
    </div>
  );
}

export default CommentModal;
