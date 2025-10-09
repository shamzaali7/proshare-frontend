import React, { useState, useEffect, useRef } from 'react';
import './Messaging.css';

function ChatWindow({ conversation, currentUser, onSendMessage, onBack }) {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [messageText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const groupMessagesByDate = (messages) => {
    if (!messages || messages.length === 0) return {};
    
    return messages.reduce((groups, message) => {
      const date = new Date(message.timestamp).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };

  const messageGroups = groupMessagesByDate(conversation.messages || []);

  return (
    <div className="chat-window">
      {/* Header */}
      <div className="chat-window-header">
        <button className="back-button" onClick={onBack}>
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
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="chat-participant-info">
          <img
            src={
              conversation.participant.profilePicture || 
              'https://img.icons8.com/ios/50/null/user-male-circle--v1.png'
            }
            alt={conversation.participant.name}
            className="chat-participant-avatar"
          />
          <div className="chat-participant-details">
            <span className="chat-participant-name">
              {conversation.participant.name}
            </span>
            <span className="chat-participant-email">
              {conversation.participant.email}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {Object.keys(messageGroups).length === 0 ? (
          <div className="no-messages">
            <img 
              src="https://img.icons8.com/clouds/150/000000/chat.png" 
              alt="chat" 
            />
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          Object.entries(messageGroups).map(([date, messages]) => (
            <div key={date} className="message-date-group">
              <div className="message-date-divider">
                <span>{date}</span>
              </div>
              {messages.map((message) => {
                const isOwnMessage = message.senderId === currentUser.googleid;
                return (
                  <div
                    key={message.id}
                    className={`message ${isOwnMessage ? 'own-message' : 'other-message'}`}
                  >
                    {!isOwnMessage && (
                      <img
                        src={
                          conversation.participant.profilePicture || 
                          'https://img.icons8.com/ios/50/null/user-male-circle--v1.png'
                        }
                        alt={conversation.participant.name}
                        className="message-avatar"
                      />
                    )}
                    <div className="message-content">
                      <div className="message-bubble">
                        <p className="message-text">{message.text}</p>
                      </div>
                      <span className="message-time">
                        {formatMessageTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <div className="chat-input-wrapper">
          <textarea
            ref={textareaRef}
            className="chat-input"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            rows="1"
          />
          <button
            type="submit"
            className="send-button"
            disabled={!messageText.trim()}
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
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatWindow;