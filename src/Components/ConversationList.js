import React from 'react';
import '../Styling/Messaging.css';

function ConversationList({ 
  conversations, 
  selectedConversation, 
  onSelectConversation, 
  onNewMessage,
  currentUserId 
}) {

  const formatLastMessage = (conversation) => {
    const text = conversation.lastMessage;
    if (!text) return 'No messages yet';

    const senderId = conversation.lastMessageSenderId;
    const prefix = senderId === currentUserId
      ? 'You'
      : (conversation.participant?.name?.split(' ')[0] || 'Them');

    const maxLen = 28;
    const truncated = text.length > maxLen ? text.slice(0, maxLen) + '…' : text;
    return `${prefix}: ${truncated}`;
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return '';
    }
    
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffInHours < 168) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="conversation-list">
      <div className="conversation-list-header">
        <h2>Messages</h2>
        <button 
          className="new-message-btn"
          onClick={onNewMessage}
          title="New message"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </button>
      </div>

      <div className="conversation-list-body">
        {conversations.length === 0 ? (
          <div className="no-conversations">
            <img 
              src="https://img.icons8.com/clouds/100/000000/speech-bubble.png" 
              alt="no messages" 
            />
            <p>No messages yet</p>
            <button onClick={onNewMessage} className="start-conversation-btn">
              Start a conversation
            </button>
          </div>
        ) : (
          conversations.map(conversation => (
            <div
              key={conversation.id}
              className={`conversation-item ${
                selectedConversation?.id === conversation.id ? 'active' : ''
              }`}
              onClick={() => onSelectConversation(conversation)}
            >
              <div className="conversation-avatar">
                <img
                  src={
                    conversation.participant.profilePicture || 
                    'https://img.icons8.com/ios/50/null/user-male-circle--v1.png'
                  }
                  alt={conversation.participant.name}
                />
                {conversation.unreadCount > 0 && (
                  <span className="online-indicator"></span>
                )}
              </div>
              <div className="conversation-content">
                <div className="conversation-header-row">
                  <span className="conversation-name">
                    {conversation.participant.name}
                  </span>
                  <span className="conversation-time">
                    {formatTimestamp(conversation.lastMessageTime)}
                  </span>
                </div>
                <div className="conversation-message-row">
                  <span className={`conversation-last-message ${
                    conversation.unreadCount > 0 ? 'unread' : ''
                  }`}>
                    {formatLastMessage(conversation)}
                  </span>
                  {conversation.unreadCount > 0 && (
                    <span className="unread-badge">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ConversationList;