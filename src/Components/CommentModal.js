import React, { useState, useEffect, useRef } from 'react';

// Normalize old string comments and new object comments into a unified shape
function normalizeComment(c, index) {
  if (typeof c === 'string') {
    return { text: c, author: null, timestamp: null, _key: index };
  }
  return { ...c, _key: index };
}

function formatTimestamp(ts) {
  if (!ts) return null;
  const d = new Date(ts);
  if (isNaN(d)) return null;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

function CommentModal({ isOpen, onClose, onSubmit, comment, onCommentChange, project, authorized }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const listEndRef = useRef(null);

  // Scroll to bottom of comment list whenever comments change or modal opens
  useEffect(() => {
    if (isOpen && listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, project?.comments?.length]);

  if (!isOpen) return null;

  const rawComments = project?.comments || [];
  const comments = rawComments
    .map(normalizeComment)
    .filter(c => c.text); // drop blank entries

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
    <div className="modal comment-view-modal">
      <div onClick={onClose} className="overlay"></div>
      <div className="modal-content comment-modal-content">

        {/* Header */}
        <div className="comment-modal-header">
          <h2 className="comment-modal-title">
            {project?.title ? `Comments · ${project.title}` : 'Comments'}
          </h2>
          <button onClick={onClose} className="comment-modal-close" aria-label="Close">
            ✕
          </button>
        </div>

        {/* Comment list */}
        <div className="comment-modal-list">
          {comments.length === 0 ? (
            <div className="comment-modal-empty">
              No comments yet. Be the first to leave one!
            </div>
          ) : (
            comments.map((c) => (
              <div key={c._key} className="comment-modal-item">
                <div className="comment-modal-item-header">
                  <span className="comment-modal-author">
                    {c.author || 'Anonymous'}
                  </span>
                  {formatTimestamp(c.timestamp) && (
                    <span className="comment-modal-time">
                      {formatTimestamp(c.timestamp)}
                    </span>
                  )}
                </div>
                <p className="comment-modal-text">{c.text}</p>
              </div>
            ))
          )}
          <div ref={listEndRef} />
        </div>

        {/* Add comment — only for signed-in, non-owners handled by caller */}
        {authorized && (
          <form onSubmit={handleSubmit} className="comment-modal-form">
            <input
              type="text"
              className="comment-modal-input"
              value={comment}
              onChange={onCommentChange}
              placeholder="Write a comment…"
              disabled={isSubmitting}
              autoFocus
            />
            <button
              type="submit"
              className="comment-modal-submit"
              disabled={isSubmitting || !comment.trim()}
            >
              {isSubmitting ? '…' : 'Post'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CommentModal;
