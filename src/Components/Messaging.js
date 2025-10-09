import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../index';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import './Messaging.css';

function Messaging() {
  const { user, allUsers, authorized, API_BASE_URL } = useContext(AppContext);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load conversations on mount
  useEffect(() => {
    if (authorized && user.googleid) {
      loadConversations();
      // Poll for new messages every 3 seconds
      const interval = setInterval(loadConversations, 3000);
      return () => clearInterval(interval);
    }
  }, [authorized, user.googleid]);

  const loadConversations = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/messages/conversations/${user.googleid}`
      );
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
        
        // If we have a selected conversation, update it with fresh data
        if (selectedConversation) {
          const updated = data.find(c => c._id === selectedConversation._id);
          if (updated) {
            setSelectedConversation(updated);
          }
        }
      }
    } catch (err) {
      console.error('Error loading conversations:', err);
      setError('Failed to load conversations');
    }
  };

  const loadConversationMessages = async (conversationId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/messages/conversation/${conversationId}`
      );
      if (response.ok) {
        const data = await response.json();
        setSelectedConversation({
          ...data.conversation,
          messages: data.messages
        });
        
        // Mark messages as read
        await fetch(`${API_BASE_URL}/messages/read`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conversationId,
            userId: user.googleid
          })
        });
      }
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Failed to load messages');
    }
  };

  const handleSelectConversation = (conversation) => {
    loadConversationMessages(conversation._id);
  };

  const handleNewMessage = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/messages/conversation/start`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId1: user.googleid,
            userId2: userId
          })
        }
      );

      if (response.ok) {
        const conversation = await response.json();
        setSelectedConversation({
          ...conversation,
          messages: []
        });
        setShowNewMessageModal(false);
        setSearchQuery('');
        
        // Reload conversations
        await loadConversations();
      }
    } catch (err) {
      console.error('Error creating conversation:', err);
      setError('Failed to create conversation');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (messageText) => {
    if (!selectedConversation || !messageText.trim()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/messages/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: selectedConversation._id,
          senderId: user.googleid,
          senderName: user.name,
          text: messageText
        })
      });

      if (response.ok) {
        // Reload conversation to get updated messages
        await loadConversationMessages(selectedConversation._id);
        await loadConversations();
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    }
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  const filteredUsers = allUsers.filter(u => 
    u.googleid !== user.googleid &&
    (u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     u.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!authorized) {
    return (
      <div className="breach">
        Please Sign In to access messaging
      </div>
    );
  }

  return (
    <div className="messaging-container font-change">
      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
      
      <div className="messaging-wrapper">
        <div className={`conversation-list-section ${selectedConversation ? 'hidden-mobile' : ''}`}>
          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            onNewMessage={() => setShowNewMessageModal(true)}
            currentUserId={user.googleid}
          />
        </div>

        <div className={`chat-window-section ${!selectedConversation ? 'hidden-mobile' : ''}`}>
          {selectedConversation ? (
            <ChatWindow
              conversation={selectedConversation}
              currentUser={user}
              onSendMessage={handleSendMessage}
              onBack={handleBackToList}
            />
          ) : (
            <div className="no-conversation-selected">
              <img 
                src="https://img.icons8.com/clouds/200/000000/message.png" 
                alt="messages" 
              />
              <h2>Select a conversation</h2>
              <p>Choose from your existing conversations or start a new one</p>
            </div>
          )}
        </div>
      </div>

      {showNewMessageModal && (
        <div className="modal">
          <div onClick={() => {
            setShowNewMessageModal(false);
            setSearchQuery('');
          }} className="overlay"></div>
          <div className="modal-content">
            <div className="new-message-modal">
              <h2 className="title-form">New Message</h2>
              <div className="input-box">
                <input
                  type="text"
                  className="input-form"
                  placeholder="Search users by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="user-list">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(u => (
                    <div
                      key={u.googleid}
                      className="user-list-item"
                      onClick={() => handleNewMessage(u.googleid)}
                      style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
                    >
                      <img
                        src={u.profilePicture || 'https://img.icons8.com/ios/50/null/user-male-circle--v1.png'}
                        alt={u.name}
                        className="user-list-avatar"
                      />
                      <div className="user-list-info">
                        <div className="user-list-name">{u.name}</div>
                        <div className="user-list-email">{u.email}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-users-found">
                    {searchQuery ? 'No users found' : 'Start typing to search users'}
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setShowNewMessageModal(false);
                  setSearchQuery('');
                }}
                className="close-modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messaging;