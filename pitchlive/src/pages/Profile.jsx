import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import ThemeToggle from '../components/ThemeToggle'
import '../styles/Profile.css'

export default function Profile() {
  const navigate = useNavigate()
  const [userType] = useState(() => {
    // Get from localStorage or URL params (default to founder for demo)
    return localStorage.getItem('userType') || 'founder'
  })
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data - replace with actual API data
  const founderData = {
    name: 'Alex Johnson',
    email: 'alex@startupco.com',
    company: 'TechStart Inc.',
    verified: true,
    trustScore: 42,
    totalRaised: '$2.5M',
    activePitches: 5,
    successfulDeals: 3,
    totalInvestors: 12,
    kycStatus: 'Verified',
    registrationStatus: 'Active'
  }

  const investorData = {
    name: 'Sarah Mitchell',
    email: 'sarah@venturefund.com',
    company: 'TechVenture Capital',
    verified: true,
    trustScore: 58,
    totalInvested: '$15.2M',
    activeDeals: 8,
    successfulDeals: 12,
    portfolioSize: 24,
    verificationStatus: 'Verified',
    investmentFocus: ['SaaS', 'FinTech', 'AI/ML']
  }

  const data = userType === 'founder' ? founderData : investorData

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="container">
          <div className="profile-nav">
            <Logo size="small" />
            <div className="profile-nav-right">
              <ThemeToggle />
              <button onClick={() => navigate('/')} className="btn btn-secondary">Back to Home</button>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="container">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                {data.name.charAt(0)}
              </div>
              <div className="profile-info">
                <h1>{data.name}</h1>
                <p className="profile-email">{data.email}</p>
                <p className="profile-company">{data.company}</p>
                {data.verified && (
                  <span className="verified-badge">
                    ✅ Verified {userType === 'founder' ? 'Founder' : 'Investor'}
                  </span>
                )}
              </div>
            </div>

            <div className="profile-tabs">
              <button 
                className={activeTab === 'overview' ? 'active' : ''}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={activeTab === 'stats' ? 'active' : ''}
                onClick={() => setActiveTab('stats')}
              >
                Statistics
              </button>
              <button 
                className={activeTab === 'settings' ? 'active' : ''}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="profile-overview">
              <div className="overview-grid">
                {/* Trust Score Card */}
                <div className="stat-card trust-score">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-content">
                    <h3>Trust Score</h3>
                    <div className="stat-value-large">{data.trustScore}</div>
                    <p className="stat-description">Based on successful deals and platform activity</p>
                  </div>
                </div>

                {/* Main Stat Cards */}
                {userType === 'founder' ? (
                  <>
                    <div className="stat-card">
                      <div className="stat-icon">💰</div>
                      <div className="stat-content">
                        <h3>Total Raised</h3>
                        <div className="stat-value">{founderData.totalRaised}</div>
                        <p className="stat-description">From all funding rounds</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">📊</div>
                      <div className="stat-content">
                        <h3>Active Pitches</h3>
                        <div className="stat-value">{founderData.activePitches}</div>
                        <p className="stat-description">Currently pitching to investors</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">✅</div>
                      <div className="stat-content">
                        <h3>Successful Deals</h3>
                        <div className="stat-value">{founderData.successfulDeals}</div>
                        <p className="stat-description">Deals closed on platform</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">👥</div>
                      <div className="stat-content">
                        <h3>Total Investors</h3>
                        <div className="stat-value">{founderData.totalInvestors}</div>
                        <p className="stat-description">Investors engaged with</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="stat-card">
                      <div className="stat-icon">💼</div>
                      <div className="stat-content">
                        <h3>Total Invested</h3>
                        <div className="stat-value">{investorData.totalInvested}</div>
                        <p className="stat-description">Across all investments</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">📈</div>
                      <div className="stat-content">
                        <h3>Active Deals</h3>
                        <div className="stat-value">{investorData.activeDeals}</div>
                        <p className="stat-description">Currently negotiating</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">🎯</div>
                      <div className="stat-content">
                        <h3>Successful Deals</h3>
                        <div className="stat-value">{investorData.successfulDeals}</div>
                        <p className="stat-description">Investments completed</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">📁</div>
                      <div className="stat-content">
                        <h3>Portfolio Size</h3>
                        <div className="stat-value">{investorData.portfolioSize}</div>
                        <p className="stat-description">Companies in portfolio</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Verification Status */}
              <div className="verification-section">
                <h2>Verification Status</h2>
                <div className="verification-grid">
                  {userType === 'founder' ? (
                    <>
                      <div className="verification-item">
                        <span className="verification-icon">✅</span>
                        <div>
                          <h4>KYC Verification</h4>
                          <p>{founderData.kycStatus}</p>
                        </div>
                      </div>
                      <div className="verification-item">
                        <span className="verification-icon">📄</span>
                        <div>
                          <h4>Company Registration</h4>
                          <p>{founderData.registrationStatus}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="verification-item">
                        <span className="verification-icon">✅</span>
                        <div>
                          <h4>Identity Verification</h4>
                          <p>{investorData.verificationStatus}</p>
                        </div>
                      </div>
                      <div className="verification-item">
                        <span className="verification-icon">💰</span>
                        <div>
                          <h4>Source of Funds</h4>
                          <p>Verified</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Investment Focus (for Investors) */}
              {userType === 'investor' && (
                <div className="investment-focus">
                  <h2>Investment Focus</h2>
                  <div className="focus-tags">
                    {investorData.investmentFocus.map((focus, index) => (
                      <span key={index} className="focus-tag">{focus}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="profile-stats">
              <h2>Detailed Statistics</h2>
              <div className="stats-grid">
                {userType === 'founder' ? (
                  <>
                    <div className="detailed-stat">
                      <h3>Funding History</h3>
                      <div className="stat-bar">
                        <div className="stat-bar-fill" style={{width: '75%'}}></div>
                      </div>
                      <p>Target: $5M | Raised: {founderData.totalRaised}</p>
                    </div>
                    <div className="detailed-stat">
                      <h3>Response Rate</h3>
                      <div className="stat-bar">
                        <div className="stat-bar-fill" style={{width: '60%'}}></div>
                      </div>
                      <p>85% of pitches receive responses</p>
                    </div>
                    <div className="detailed-stat">
                      <h3>Deal Success Rate</h3>
                      <div className="stat-bar">
                        <div className="stat-bar-fill" style={{width: '80%'}}></div>
                      </div>
                      <p>60% conversion rate</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="detailed-stat">
                      <h3>Investment Activity</h3>
                      <div className="stat-bar">
                        <div className="stat-bar-fill" style={{width: '65%'}}></div>
                      </div>
                      <p>Active in {investorData.activeDeals} deals</p>
                    </div>
                    <div className="detailed-stat">
                      <h3>Portfolio Growth</h3>
                      <div className="stat-bar">
                        <div className="stat-bar-fill" style={{width: '90%'}}></div>
                      </div>
                      <p>{investorData.portfolioSize} companies funded</p>
                    </div>
                    <div className="detailed-stat">
                      <h3>Average Deal Size</h3>
                      <div className="stat-bar">
                        <div className="stat-bar-fill" style={{width: '70%'}}></div>
                      </div>
                      <p>$1.2M per investment</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="profile-settings">
              <h2>Profile Settings</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    defaultValue={data.name}
                    onChange={(e) => localStorage.setItem('userName', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" defaultValue={data.email} />
                </div>
                <div className="form-group">
                  <label>{userType === 'founder' ? 'Company Name' : 'Investment Firm'}</label>
                  <input type="text" defaultValue={data.company} />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input type="password" placeholder="Confirm new password" />
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    alert('Settings saved successfully!')
                    window.location.reload()
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

