import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../index';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import '../Styling/Messaging.css';

function Messaging() {
  const { 
    user, 
    allUsers, 
    authorized, 
    getConversations, 
    getMessages,
    sendMessage,
    markMessagesAsRead,
    socket 
  } = useContext(AppContext);
  
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authorized) {
      loadConversations();
    }
  }, [authorized]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (socket && authorized) {
      socket.on("receiveMessage", async (data) => {
        const { message, conversationId } = data;
        
        // Update conversations list
        await loadConversations();
        
        // If the message is for the currently open conversation, add it
        if (selectedConversation && selectedConversation.id === conversationId) {
          setSelectedConversation(prev => ({
            ...prev,
            messages: [...(prev.messages || []), message]
          }));
          
          // Mark as read
          await markMessagesAsRead(conversationId);
        }
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [socket, authorized, selectedConversation]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const convs = await getConversations();
      
      const enrichedConvs = convs.map(conv => ({
        ...conv,
        id: conv.conversationId || conv.id,
        lastMessage: conv.lastMessage || '',
        lastMessageTime: conv.lastMessageTime || conv.updatedAt || new Date().toISOString(),
        unreadCount: conv.unreadCount || 0
      }));
      
      setConversations(enrichedConvs);
    } catch (err) {
      console.log("Error loading conversations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectConversation = async (conversation) => {
    try {
      setLoading(true);
      const messages = await getMessages(conversation.id);
      
      const conversationWithMessages = {
        ...conversation,
        messages
      };
      
      setSelectedConversation(conversationWithMessages);
      
      // Mark messages as read
      await markMessagesAsRead(conversation.id);
      
      // Update conversation list to reflect read status
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversation.id 
            ? { ...conv, unreadCount: 0 }
            : conv
        )
      );
    } catch (err) {
      console.log("Error selecting conversation:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewMessage = async (userId) => {
    const participant = allUsers.find(u => u.googleid === userId);
    if (participant) {
      // Check if conversation already exists
      const existingConv = conversations.find(
        conv => conv.participant.googleid === userId
      );
      
      if (existingConv) {
        await handleSelectConversation(existingConv);
      } else {
        // Create new conversation locally
        const newConv = {
          id: `new-${Date.now()}`,
          participant,
          lastMessage: '',
          lastMessageTime: new Date().toISOString(),
          unreadCount: 0,
          messages: []
        };
        setSelectedConversation(newConv);
      }
      setShowNewMessageModal(false);
      setSearchQuery('');
    }
  };

  const handleSendMessage = async (messageText) => {
    if (!selectedConversation || !messageText.trim()) return;

    // Create optimistic message
    const optimisticMessage = {
      id: `temp-${Date.now()}`,
      text: messageText,
      senderId: user.googleid,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      status: 'sending'
    };

    // Add optimistic message to UI
    setSelectedConversation(prev => ({
      ...prev,
      messages: [...(prev.messages || []), optimisticMessage]
    }));

    try {
      const result = await sendMessage(
        selectedConversation.participant.googleid,
        selectedConversation.participant.name,
        messageText
      );

      const newMessage = {
        id: result.message._id || result.message.id,
        text: result.message.text,
        senderId: result.message.senderId,
        timestamp: result.message.createdAt || new Date().toISOString(),
        createdAt: result.message.createdAt || new Date().toISOString(),
        status: 'sent'
      };
      
      // Replace optimistic message with real one
      setSelectedConversation(prev => ({
        ...prev,
        id: result.conversationId,
        lastMessage: messageText,
        lastMessageTime: newMessage.createdAt,
        messages: prev.messages.map(msg => 
          msg.id === optimisticMessage.id ? newMessage : msg
        )
      }));

      // Update conversations list
      setConversations(prevConvs => {
        const updated = prevConvs.map(conv => {
          if (conv.id === result.conversationId || 
              conv.participant.googleid === selectedConversation.participant.googleid) {
            return {
              ...conv,
              id: result.conversationId,
              lastMessage: messageText,
              lastMessageTime: newMessage.createdAt,
              unreadCount: 0
            };
          }
          return conv;
        });

        if (!updated.find(c => c.id === result.conversationId)) {
          updated.unshift({
            id: result.conversationId,
            participant: selectedConversation.participant,
            lastMessage: messageText,
            lastMessageTime: newMessage.createdAt,
            unreadCount: 0,
            messages: [newMessage]
          });
        }
        
        return updated;
      });
      
    } catch (err) {
      console.log("Error sending message:", err);

      setSelectedConversation(prev => ({
        ...prev,
        messages: prev.messages.map(msg => 
          msg.id === optimisticMessage.id 
            ? { ...msg, status: 'failed' } 
            : msg
        )
      }));
      
      throw err; // Re-throw to handle in ChatWindow
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
      <div className="messaging-wrapper">
        <div className={`conversation-list-section ${selectedConversation ? 'hidden-mobile' : ''}`}>
          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            onNewMessage={() => setShowNewMessageModal(true)}
            currentUserId={user.googleid}
            loading={loading}
          />
        </div>

        <div className={`chat-window-section ${!selectedConversation ? 'hidden-mobile' : ''}`}>
          {selectedConversation ? (
            <ChatWindow
              conversation={selectedConversation}
              currentUser={user}
              onSendMessage={handleSendMessage}
              onBack={handleBackToList}
              loading={loading}
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