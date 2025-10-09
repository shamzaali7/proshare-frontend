import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../index';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import './Messaging.css';

function Messaging() {
  const { user, allUsers, authorized } = useContext(AppContext);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock conversations for layout (will be replaced with real data from backend)
  useEffect(() => {
    if (authorized) {
      // Mock data for demonstration
      const mockConversations = [
        {
          id: '1',
          participant: allUsers.find(u => u.googleid !== user.googleid) || {},
          lastMessage: 'Hey, great project!',
          lastMessageTime: new Date().toISOString(),
          unreadCount: 2
        }
      ];
      setConversations(mockConversations);
    }
  }, [authorized, allUsers, user]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    // Mark messages as read (will be implemented with backend)
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversation.id 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  const handleNewMessage = (userId) => {
    const participant = allUsers.find(u => u.googleid === userId);
    if (participant) {
      // Check if conversation already exists
      const existingConv = conversations.find(
        conv => conv.participant.googleid === userId
      );
      
      if (existingConv) {
        setSelectedConversation(existingConv);
      } else {
        // Create new conversation
        const newConv = {
          id: `new-${Date.now()}`,
          participant,
          lastMessage: '',
          lastMessageTime: new Date().toISOString(),
          unreadCount: 0,
          messages: []
        };
        setConversations(prev => [newConv, ...prev]);
        setSelectedConversation(newConv);
      }
      setShowNewMessageModal(false);
      setSearchQuery('');
    }
  };

  const handleSendMessage = (messageText) => {
    if (!selectedConversation || !messageText.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      text: messageText,
      senderId: user.googleid,
      senderName: user.name,
      timestamp: new Date().toISOString(),
      read: false
    };

    // Update conversation with new message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation.id
          ? {
              ...conv,
              lastMessage: messageText,
              lastMessageTime: newMessage.timestamp,
              messages: [...(conv.messages || []), newMessage]
            }
          : conv
      )
    );

    // Update selected conversation
    setSelectedConversation(prev => ({
      ...prev,
      lastMessage: messageText,
      lastMessageTime: newMessage.timestamp,
      messages: [...(prev.messages || []), newMessage]
    }));

    // Backend integration will happen here
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
      <div className="messaging-wrapper">
        {/* Conversation List - Hidden on mobile when chat is open */}
        <div className={`conversation-list-section ${selectedConversation ? 'hidden-mobile' : ''}`}>
          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            onNewMessage={() => setShowNewMessageModal(true)}
            currentUserId={user.googleid}
          />
        </div>

        {/* Chat Window */}
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

      {/* New Message Modal */}
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
                  filteredUsers.map(user => (
                    <div
                      key={user.googleid}
                      className="user-list-item"
                      onClick={() => handleNewMessage(user.googleid)}
                    >
                      <img
                        src={user.profilePicture || 'https://img.icons8.com/ios/50/null/user-male-circle--v1.png'}
                        alt={user.name}
                        className="user-list-avatar"
                      />
                      <div className="user-list-info">
                        <div className="user-list-name">{user.name}</div>
                        <div className="user-list-email">{user.email}</div>
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