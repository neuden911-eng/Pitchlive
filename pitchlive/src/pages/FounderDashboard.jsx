import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import ThemeToggle from '../components/ThemeToggle'

export default function FounderDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  // Check user type and redirect if not founder
  useEffect(() => {
    const userType = localStorage.getItem('userType')
    if (userType !== 'founder') {
      navigate('/investor-dashboard')
    }
  }, [navigate])

  // Mock founder data
  const founderData = {
    name: 'Alex Johnson',
    company: 'TechStart Inc.',
    stage: 'Series A',
    fundingRaised: '$2.5M',
    fundingGoal: '$5M',
    activePitches: 5,
    successfulDeals: 3,
    totalInvestors: 12,
    trustScore: 42
  }

  const recentActivities = [
    { type: 'pitch', message: 'Pitched to TechVenture Capital', time: '2 hours ago', status: 'pending' },
    { type: 'meeting', message: 'Scheduled meeting with Sarah Mitchell', time: '1 day ago', status: 'confirmed' },
    { type: 'funding', message: 'Received $500K from Angel Investors', time: '3 days ago', status: 'completed' },
    { type: 'pitch', message: 'Pitched to Innovation Fund', time: '1 week ago', status: 'rejected' }
  ]

  const upcomingEvents = [
    { title: 'Demo Day Presentation', date: 'Dec 15, 2024', time: '2:00 PM', type: 'pitch' },
    { title: 'Investor Meeting - TechVenture', date: 'Dec 18, 2024', time: '10:00 AM', type: 'meeting' },
    { title: 'Startup Accelerator Program', date: 'Dec 20, 2024', time: '9:00 AM', type: 'event' }
  ]

  return (
    <div className="founder-dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-nav">
            <Logo size="small" />
            <div className="dashboard-nav-right">
              <ThemeToggle />
              <button onClick={() => navigate('/profile')} className="btn btn-secondary">Profile</button>
              <button onClick={() => navigate('/')} className="btn btn-outline">Logout</button>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="container">
          <div className="dashboard-title">
            <h1>Founder Dashboard</h1>
            <p>Manage your startup and connect with investors</p>
          </div>

          <div className="dashboard-tabs">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'pitches' ? 'active' : ''}`}
              onClick={() => setActiveTab('pitches')}
            >
              Pitches
            </button>
            <button 
              className={`tab-btn ${activeTab === 'investors' ? 'active' : ''}`}
              onClick={() => setActiveTab('investors')}
            >
              Investors
            </button>
            <button 
              className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-content">
                    <h3>Total Raised</h3>
                    <div className="stat-value">{founderData.fundingRaised}</div>
                    <p className="stat-description">From all funding rounds</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🎯</div>
                  <div className="stat-content">
                    <h3>Funding Goal</h3>
                    <div className="stat-value">{founderData.fundingGoal}</div>
                    <p className="stat-description">Current round target</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-content">
                    <h3>Active Pitches</h3>
                    <div className="stat-value">{founderData.activePitches}</div>
                    <p className="stat-description">Currently pitching</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">✅</div>
                  <div className="stat-content">
                    <h3>Successful Deals</h3>
                    <div className="stat-value">{founderData.successfulDeals}</div>
                    <p className="stat-description">Deals closed</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-content">
                    <h3>Total Investors</h3>
                    <div className="stat-value">{founderData.totalInvestors}</div>
                    <p className="stat-description">Investors engaged</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-content">
                    <h3>Trust Score</h3>
                    <div className="stat-value">{founderData.trustScore}</div>
                    <p className="stat-description">Platform reputation</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-grid">
                <div className="recent-activities">
                  <h3>Recent Activities</h3>
                  <div className="activities-list">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="activity-item">
                        <div className="activity-icon">
                          {activity.type === 'pitch' && '🎯'}
                          {activity.type === 'meeting' && '📅'}
                          {activity.type === 'funding' && '💰'}
                        </div>
                        <div className="activity-content">
                          <p className="activity-message">{activity.message}</p>
                          <span className="activity-time">{activity.time}</span>
                        </div>
                        <div className={`activity-status ${activity.status}`}>
                          {activity.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="upcoming-events">
                  <h3>Upcoming Events</h3>
                  <div className="events-list">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="event-item">
                        <div className="event-icon">
                          {event.type === 'pitch' && '🎯'}
                          {event.type === 'meeting' && '📅'}
                          {event.type === 'event' && '📅'}
                        </div>
                        <div className="event-content">
                          <h4 className="event-title">{event.title}</h4>
                          <p className="event-date">{event.date} at {event.time}</p>
                        </div>
                        <button className="btn btn-small">View</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                  <button className="action-btn">
                    <span className="action-icon">➕</span>
                    <span className="action-text">Create New Pitch</span>
                  </button>
                  <button className="action-btn">
                    <span className="action-icon">📊</span>
                    <span className="action-text">Update Metrics</span>
                  </button>
                  <button className="action-btn">
                    <span className="action-icon">📄</span>
                    <span className="action-text">Upload Documents</span>
                  </button>
                  <button className="action-btn">
                    <span className="action-icon">🔍</span>
                    <span className="action-text">Find Investors</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pitches' && (
            <div className="pitches-content">
              <div className="content-header">
                <h3>Your Pitches</h3>
                <button className="btn btn-primary">Create New Pitch</button>
              </div>
              <div className="pitches-grid">
                <div className="pitch-card">
                  <div className="pitch-header">
                    <h4>Series A Funding Round</h4>
                    <span className="pitch-status active">Active</span>
                  </div>
                  <p className="pitch-description">Seeking $5M to scale our AI platform and expand to new markets</p>
                  <div className="pitch-metrics">
                    <div className="metric">
                      <span className="metric-label">Target</span>
                      <span className="metric-value">$5M</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Raised</span>
                      <span className="metric-value">$2.5M</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Investors</span>
                      <span className="metric-value">12</span>
                    </div>
                  </div>
                  <div className="pitch-actions">
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-secondary">View</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'investors' && (
            <div className="investors-content">
              <div className="content-header">
                <h3>Investor Network</h3>
                <button className="btn btn-primary">Find New Investors</button>
              </div>
              <div className="investors-grid">
                <div className="investor-card">
                  <div className="investor-avatar">SM</div>
                  <div className="investor-info">
                    <h4>Sarah Mitchell</h4>
                    <p>TechVenture Capital</p>
                    <span className="investor-status interested">Interested</span>
                  </div>
                  <div className="investor-actions">
                    <button className="btn btn-primary">Message</button>
                    <button className="btn btn-secondary">Schedule</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="analytics-content">
              <h3>Analytics & Insights</h3>
              <div className="analytics-grid">
                <div className="analytics-card">
                  <h4>Pitch Performance</h4>
                  <div className="analytics-chart">
                    <div className="chart-placeholder">📊 Chart Placeholder</div>
                  </div>
                </div>
                <div className="analytics-card">
                  <h4>Investor Engagement</h4>
                  <div className="analytics-chart">
                    <div className="chart-placeholder">📈 Chart Placeholder</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
