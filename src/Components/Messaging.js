import React, { useState, useContext, useEffect, useRef } from 'react';
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
  
  const selectedConversationRef = useRef(null);
  const pollRef = useRef(null);

  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  // Keep pollRef fresh so the interval always uses latest context/state
  pollRef.current = async () => {
    if (!authorized) return;
    try {
      const freshConvs = await getConversations();
      const enrichedConvs = freshConvs.map(conv => ({
        ...conv,
        id: conv.conversationId || conv.id,
        lastMessage: conv.lastMessage || '',
        lastMessageSenderId: conv.lastMessageSenderId || '',
        lastMessageTime: conv.lastMessageTime || conv.updatedAt || new Date().toISOString(),
        unreadCount: conv.unreadCount || 0
      }));
      enrichedConvs.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
      setConversations(enrichedConvs);

      const currentConv = selectedConversationRef.current;
      if (currentConv?.id && !currentConv.id.startsWith('new-')) {
        const freshMessages = await getMessages(currentConv.id);
        setSelectedConversation(prev => {
          if (!prev || prev.id !== currentConv.id) return prev;
          // Keep any in-flight optimistic messages not yet confirmed by server
          const pendingMsgs = (prev.messages || []).filter(m => m.status === 'sending');
          const serverMsgs = freshMessages.map(msg => ({
            ...msg,
            id: msg._id || msg.id,
            timestamp: msg.createdAt || msg.timestamp,
            status: 'sent'
          }));
          const serverIds = new Set(serverMsgs.map(m => m.id || m._id));
          const stillPending = pendingMsgs.filter(m => !serverIds.has(m.id));
          const merged = [...serverMsgs, ...stillPending].sort(
            (a, b) => new Date(a.timestamp || a.createdAt) - new Date(b.timestamp || b.createdAt)
          );
          return { ...prev, messages: merged };
        });
      }
    } catch (err) {
      console.log("Polling error:", err);
    }
  };

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
      socket.off("receiveMessage");

      socket.on("receiveMessage", async (data) => {
        const { message, conversationId } = data;
        const convIdStr = String(conversationId);

        let conversationFound = false;

        setConversations(prevConvs => {
          const exists = prevConvs.some(conv => String(conv.id) === convIdStr);
          conversationFound = exists;

          if (!exists) {
            // Conversation not in list yet (first message from this person).
            // Return unchanged — the async refresh below will add it.
            return prevConvs;
          }

          const updated = prevConvs.map(conv =>
            String(conv.id) === convIdStr
              ? {
                  ...conv,
                  lastMessage: message.text,
                  lastMessageSenderId: message.senderId,
                  lastMessageTime: message.createdAt || message.timestamp,
                  unreadCount:
                    String(selectedConversationRef.current?.id) === convIdStr
                      ? 0
                      : (conv.unreadCount || 0) + 1
                }
              : conv
          );

          return updated.sort((a, b) =>
            new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
          );
        });

        // If the conversation wasn't in the list (first message), fetch fresh data
        // so the sidebar shows the new conversation immediately.
        if (!conversationFound) {
          try {
            const freshConvs = await getConversations();
            const enrichedConvs = freshConvs.map(conv => ({
              ...conv,
              id: conv.conversationId || conv.id,
              lastMessage: conv.lastMessage || '',
              lastMessageSenderId: conv.lastMessageSenderId || '',
              lastMessageTime: conv.lastMessageTime || conv.updatedAt || new Date().toISOString(),
              unreadCount: conv.unreadCount || 0
            }));
            enrichedConvs.sort((a, b) =>
              new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
            );
            setConversations(enrichedConvs);
          } catch (err) {
            console.log("Error refreshing conversations after new message:", err);
          }
        }

        // Update the open chat window if this conversation is active.
        if (selectedConversationRef.current && String(selectedConversationRef.current.id) === convIdStr) {
          setSelectedConversation(prev => {
            if (!prev) return prev;
            const messageExists = prev.messages?.some(
              m => String(m.id) === String(message.id) || String(m._id) === String(message._id)
            );
            if (messageExists) return prev;

            return {
              ...prev,
              lastMessage: message.text,
              lastMessageTime: message.createdAt || message.timestamp,
              messages: [...(prev.messages || []), {
                ...message,
                id: message._id || message.id,
                timestamp: message.createdAt || message.timestamp
              }]
            };
          });

          await markMessagesAsRead(conversationId);
        }
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [socket, authorized, markMessagesAsRead]);

  // Polling fallback: refreshes conversations + active messages every 10s
  // Handles cases where socket is unavailable (Heroku cold starts, reconnects)
  useEffect(() => {
    if (!authorized) return;
    const interval = setInterval(() => pollRef.current?.(), 10000);
    return () => clearInterval(interval);
  }, [authorized]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const convs = await getConversations();
      
      const enrichedConvs = convs.map(conv => ({
        ...conv,
        id: conv.conversationId || conv.id,
        lastMessage: conv.lastMessage || '',
        lastMessageSenderId: conv.lastMessageSenderId || '',
        lastMessageTime: conv.lastMessageTime || conv.updatedAt || new Date().toISOString(),
        unreadCount: conv.unreadCount || 0
      }));
      
      enrichedConvs.sort((a, b) => 
        new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
      );
      
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
        messages: messages.map(msg => ({
          ...msg,
          id: msg._id || msg.id,
          timestamp: msg.createdAt || msg.timestamp
        }))
      };
      
      setSelectedConversation(conversationWithMessages);
      
      await markMessagesAsRead(conversation.id);

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
      const existingConv = conversations.find(
        conv => conv.participant.googleid === userId
      );
      
      if (existingConv) {
        await handleSelectConversation(existingConv);
      } else {
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

    const optimisticMessage = {
      id: `temp-${Date.now()}`,
      text: messageText,
      senderId: user.googleid,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      status: 'sending'
    };

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
      
      setSelectedConversation(prev => ({
        ...prev,
        id: result.conversationId,
        lastMessage: messageText,
        lastMessageTime: newMessage.createdAt,
        messages: prev.messages.map(msg => 
          msg.id === optimisticMessage.id ? newMessage : msg
        )
      }));

      setConversations(prevConvs => {
        const updated = prevConvs.map(conv => {
          if (conv.id === result.conversationId ||
              conv.participant.googleid === selectedConversation.participant.googleid) {
            return {
              ...conv,
              id: result.conversationId,
              lastMessage: messageText,
              lastMessageSenderId: user.googleid,
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
            lastMessageSenderId: user.googleid,
            lastMessageTime: newMessage.createdAt,
            unreadCount: 0,
            messages: [newMessage]
          });
        }
        
        return updated.sort((a, b) => 
          new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
        );
      });
      
      return true;
      
    } catch (err) {
      console.log("Error sending message:", err);

      // Recovery: the message may have reached the server despite the error
      // (e.g. Heroku cold start causes a 503 timeout even though the dyno saved the message)
      let recovered = false;
      try {
        const freshConvs = await getConversations();
        const matchingConv = freshConvs.find(
          c => c.participant?.googleid === selectedConversation.participant.googleid
        );
        if (matchingConv) {
          const convId = matchingConv.conversationId || matchingConv.id;
          const serverMessages = await getMessages(convId);
          const recentMsg = serverMessages.find(
            m => m.senderId === user.googleid &&
                 m.text === messageText &&
                 Date.now() - new Date(m.createdAt).getTime() < 120000
          );
          if (recentMsg) {
            // Message did reach the server — restore it in the UI
            recovered = true;
            const newMessage = {
              id: recentMsg._id || recentMsg.id,
              text: recentMsg.text,
              senderId: recentMsg.senderId,
              timestamp: recentMsg.createdAt,
              createdAt: recentMsg.createdAt,
              status: 'sent'
            };
            setSelectedConversation(prev => ({
              ...prev,
              id: convId,
              lastMessage: messageText,
              messages: prev.messages.map(msg =>
                msg.id === optimisticMessage.id ? newMessage : msg
              )
            }));
            const enrichedConvs = freshConvs.map(conv => ({
              ...conv,
              id: conv.conversationId || conv.id,
              lastMessage: conv.lastMessage || '',
              lastMessageSenderId: conv.lastMessageSenderId || '',
              lastMessageTime: conv.lastMessageTime || conv.updatedAt || new Date().toISOString(),
              unreadCount: conv.unreadCount || 0
            }));
            enrichedConvs.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
            setConversations(enrichedConvs);
          } else {
            // Conversation exists but message wasn't saved (Heroku cold-start timeout).
            // Dyno is now warm from the recovery calls above — retry the send once.
            try {
              const retryResult = await sendMessage(
                selectedConversation.participant.googleid,
                selectedConversation.participant.name,
                messageText
              );
              const retryMsg = {
                id: retryResult.message._id || retryResult.message.id,
                text: retryResult.message.text,
                senderId: retryResult.message.senderId,
                timestamp: retryResult.message.createdAt || new Date().toISOString(),
                createdAt: retryResult.message.createdAt || new Date().toISOString(),
                status: 'sent'
              };
              setSelectedConversation(prev => ({
                ...prev,
                id: retryResult.conversationId,
                lastMessage: messageText,
                lastMessageTime: retryMsg.createdAt,
                messages: prev.messages.map(m =>
                  m.id === optimisticMessage.id ? retryMsg : m
                )
              }));
              setConversations(prevConvs => {
                const updated = prevConvs.map(conv => {
                  if (conv.id === retryResult.conversationId ||
                      conv.participant?.googleid === selectedConversation.participant.googleid) {
                    return {
                      ...conv,
                      id: retryResult.conversationId,
                      lastMessage: messageText,
                      lastMessageSenderId: user.googleid,
                      lastMessageTime: retryMsg.createdAt,
                      unreadCount: 0
                    };
                  }
                  return conv;
                });
                if (!updated.find(c => c.id === retryResult.conversationId)) {
                  updated.unshift({
                    id: retryResult.conversationId,
                    participant: selectedConversation.participant,
                    lastMessage: messageText,
                    lastMessageSenderId: user.googleid,
                    lastMessageTime: retryMsg.createdAt,
                    unreadCount: 0
                  });
                }
                return updated.sort((a, b) =>
                  new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
                );
              });
              recovered = true;
            } catch (retryErr) {
              console.log("Retry also failed:", retryErr);
            }
          }
        }
      } catch (recoveryErr) {
        console.log("Recovery check failed:", recoveryErr);
      }

      if (!recovered) {
        setSelectedConversation(prev => ({
          ...prev,
          messages: prev.messages.map(msg =>
            msg.id === optimisticMessage.id
              ? { ...msg, status: 'failed' }
              : msg
          )
        }));
      }

      return recovered;
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
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
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