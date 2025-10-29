import { useState, useEffect } from 'react'

export default function ChatWidget({ currentUser, onOpenConversation }) {
  const [isOpen, setIsOpen] = useState(false)
  const [conversations, setConversations] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)

  // Mock conversation data - in real app, this would come from your backend
  useEffect(() => {
    const mockConversations = [
      {
        id: 1,
        startupId: 1,
        startupName: 'TechFlow Solutions',
        lastMessage: "Great! We're projecting 200% YoY growth and plan to expand to 3 new markets by Q2 2024.",
        lastMessageTime: "2 hours ago",
        unreadCount: 2,
        isOnline: true,
        avatar: 'T'
      },
      {
        id: 2,
        startupId: 2,
        startupName: 'HealthTech Innovations',
        lastMessage: "Thank you for your interest. We'd be happy to discuss our Series A round with you.",
        lastMessageTime: "1 day ago",
        unreadCount: 0,
        isOnline: false,
        avatar: 'H'
      },
      {
        id: 3,
        startupId: 3,
        startupName: 'EduTech Dynamics',
        lastMessage: "I can send you our detailed financial projections if you'd like.",
        lastMessageTime: "3 days ago",
        unreadCount: 1,
        isOnline: true,
        avatar: 'E'
      },
      {
        id: 4,
        startupId: 4,
        startupName: 'CryptoVault Security',
        lastMessage: "Let me share some additional information about that topic.",
        lastMessageTime: "1 week ago",
        unreadCount: 0,
        isOnline: false,
        avatar: 'C'
      }
    ]
    
    setConversations(mockConversations)
    const totalUnread = mockConversations.reduce((sum, conv) => sum + conv.unreadCount, 0)
    setUnreadCount(totalUnread)
  }, [])

  const formatTime = (timeString) => {
    return timeString
  }

  const handleConversationClick = (conversation) => {
    onOpenConversation(conversation)
    // Mark as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversation.id 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    )
    setUnreadCount(prev => prev - conversation.unreadCount)
  }

  return (
    <div className="chatbot-widget">
      {/* Chatbot Toggle Button */}
      <button 
        className="chatbot-toggle-btn"
        onClick={() => {
          setIsOpen(!isOpen)
          if (isOpen) {
            setIsMinimized(false)
          }
        }}
      >
        <div className="chatbot-icon">
          {isOpen ? '✕' : '💬'}
        </div>
        {!isOpen && unreadCount > 0 && (
          <div className="unread-badge">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
        <div className="chatbot-label">
          {isOpen ? 'Close' : 'Messages'}
        </div>
      </button>

      {/* Chatbot Panel */}
      {isOpen && (
        <div className={`chatbot-panel ${isMinimized ? 'minimized' : ''}`}>
          <div className="chatbot-header">
            <div className="chatbot-title">
              <div className="chatbot-avatar">🤖</div>
              <div className="chatbot-info">
                <h3>Investment Assistant</h3>
                <span className="status">Online • {conversations.length} conversations</span>
              </div>
            </div>
            <div className="chatbot-controls">
              <button 
                className="minimize-btn"
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? '⬆️' : '⬇️'}
              </button>
              <button 
                className="close-btn"
                onClick={() => setIsOpen(false)}
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="conversations-list">
                {conversations.length === 0 ? (
                  <div className="no-conversations">
                    <div className="no-conversations-icon">💬</div>
                    <p>No conversations yet</p>
                    <small>Start chatting with startups to see messages here</small>
                  </div>
                ) : (
                  conversations.map(conversation => (
                    <div 
                      key={conversation.id}
                      className={`conversation-item ${conversation.unreadCount > 0 ? 'unread' : ''}`}
                      onClick={() => handleConversationClick(conversation)}
                    >
                      <div className="conversation-avatar">
                        <span>{conversation.avatar}</span>
                        {conversation.isOnline && <div className="online-indicator"></div>}
                      </div>
                      
                      <div className="conversation-content">
                        <div className="conversation-header">
                          <h4>{conversation.startupName}</h4>
                          <span className="message-time">{conversation.lastMessageTime}</span>
                        </div>
                        <p className="last-message">{conversation.lastMessage}</p>
                      </div>

                      {conversation.unreadCount > 0 && (
                        <div className="unread-indicator">
                          <span>{conversation.unreadCount}</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="chatbot-footer">
                <div className="quick-actions">
                  <button className="quick-action-btn">
                    📊 View Analytics
                  </button>
                  <button className="quick-action-btn">
                    🔍 Search Startups
                  </button>
                </div>
                <div className="user-info">
                  <div className="user-avatar">
                    {currentUser?.name?.charAt(0) || 'I'}
                  </div>
                  <span>{currentUser?.name || 'Investor'}</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
