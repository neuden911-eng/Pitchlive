import { useState, useEffect } from 'react'

export default function MessagingSystem({ isOpen, onClose, startup, currentUser }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)

  // Mock conversation data
  useEffect(() => {
    const mockConversations = [
      {
        id: 1,
        startupId: startup?.id,
        startupName: startup?.name,
        lastMessage: "Hi, I'm interested in learning more about your funding round.",
        lastMessageTime: "2 hours ago",
        unreadCount: 2,
        messages: [
          {
            id: 1,
            sender: 'investor',
            senderName: currentUser?.name || 'You',
            message: "Hi, I'm interested in learning more about your funding round.",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            isRead: true
          },
          {
            id: 2,
            sender: 'startup',
            senderName: startup?.name || 'Startup',
            message: "Hello! Thank you for your interest. We'd be happy to discuss our Series A round with you. What specific information would you like to know?",
            timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
            isRead: true
          },
          {
            id: 3,
            sender: 'investor',
            senderName: currentUser?.name || 'You',
            message: "I'm particularly interested in your revenue projections and market expansion plans.",
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
            isRead: false
          },
          {
            id: 4,
            sender: 'startup',
            senderName: startup?.name || 'Startup',
            message: "Great! We're projecting 200% YoY growth and plan to expand to 3 new markets by Q2 2024. I can send you our detailed financial projections if you'd like.",
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            isRead: false
          }
        ]
      }
    ]
    setConversations(mockConversations)
    if (startup) {
      const conversation = mockConversations.find(conv => conv.startupId === startup.id)
      if (conversation) {
        setActiveConversation(conversation)
        setMessages(conversation.messages)
      }
    }
  }, [startup, currentUser])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: Date.now(),
      sender: 'investor',
      senderName: currentUser?.name || 'You',
      message: newMessage,
      timestamp: new Date(),
      isRead: false
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Simulate startup response after 2 seconds
    setTimeout(() => {
      const responses = [
        "Thank you for your message. Let me get back to you with more details.",
        "That's a great question! I'll need to check with our team and get back to you.",
        "I appreciate your interest. We can schedule a call to discuss this further.",
        "Let me share some additional information about that topic.",
        "That's exactly what we're looking for in our next funding round."
      ]
      
      const response = {
        id: Date.now() + 1,
        sender: 'startup',
        senderName: startup?.name || 'Startup',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        isRead: false
      }
      
      setMessages(prev => [...prev, response])
    }, 2000)
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  if (!isOpen) return null

  return (
    <div className="messaging-overlay" onClick={onClose}>
      <div className="messaging-container" onClick={(e) => e.stopPropagation()}>
        <div className="messaging-header">
          <div className="conversation-info">
            <h3>{startup?.name || 'Conversations'}</h3>
            <p>Investment Discussion</p>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="messaging-content">
          <div className="conversations-sidebar">
            <h4>Conversations</h4>
            <div className="conversations-list">
              {conversations.map(conversation => (
                <div 
                  key={conversation.id}
                  className={`conversation-item ${activeConversation?.id === conversation.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveConversation(conversation)
                    setMessages(conversation.messages)
                  }}
                >
                  <div className="conversation-avatar">
                    {conversation.startupName?.charAt(0) || 'S'}
                  </div>
                  <div className="conversation-details">
                    <h5>{conversation.startupName || 'Unknown Startup'}</h5>
                    <p className="last-message">{conversation.lastMessage}</p>
                    <span className="message-time">{conversation.lastMessageTime}</span>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="unread-badge">{conversation.unreadCount}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="chat-area">
            <div className="messages-container">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`message ${message.sender === 'investor' ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    <div className="message-header">
                      <span className="sender-name">{message.senderName}</span>
                      <span className="message-time">{formatTime(message.timestamp)}</span>
                    </div>
                    <div className="message-text">{message.message}</div>
                  </div>
                </div>
              ))}
            </div>

            <form className="message-input-form" onSubmit={handleSendMessage}>
              <div className="message-input-container">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="message-input"
                />
                <button type="submit" className="send-btn" disabled={!newMessage.trim()}>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
