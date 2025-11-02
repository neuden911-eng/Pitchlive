import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import ThemeToggle from '../components/ThemeToggle'
import { useAuth } from '../hooks/useAuth.js'
import '../styles/Profile.css'

export default function Profile() {
  const navigate = useNavigate()
  const { user, isAuthenticated, updateUser, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [editing, setEditing] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    // Initialize form with current user data
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        company: user.company || '',
        password: '',
        confirmPassword: ''
      })
    }
  }, [user, isAuthenticated, navigate])

  // Mock data - replace with actual API data
  const founderData = {
    name: user?.name || 'Alex Johnson',
    email: user?.email || 'alex@startupco.com',
    company: user?.company || 'TechStart Inc.',
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
    name: user?.name || 'Sarah Mitchell',
    email: user?.email || 'sarah@venturefund.com',
    company: user?.company || 'TechVenture Capital',
    verified: true,
    trustScore: 58,
    totalInvested: '$15.2M',
    activeDeals: 8,
    successfulDeals: 12,
    portfolioSize: 24,
    verificationStatus: 'Verified',
    investmentFocus: ['SaaS', 'FinTech', 'AI/ML']
  }

  const userType = user?.userType || 'founder'
  const data = userType === 'founder' ? founderData : investorData

  const handleEditProfile = () => {
    setEditing(true)
    setProfileForm({
      name: user?.name || '',
      email: user?.email || '',
      company: user?.company || '',
      password: '',
      confirmPassword: ''
    })
  }

  const handleCancelEdit = () => {
    setEditing(false)
    setFormErrors({})
    setProfileForm({
      name: user?.name || '',
      email: user?.email || '',
      company: user?.company || '',
      password: '',
      confirmPassword: ''
    })
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSaveProfile = async () => {
    const newErrors = {}

    // Validate name
    if (!profileForm.name.trim()) {
      newErrors.name = 'Name is required'
    }

    // Validate email
    if (!profileForm.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(profileForm.email)) {
      newErrors.email = 'Email is invalid'
    }

    // Validate password if provided
    if (profileForm.password) {
      if (profileForm.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters'
      }
      if (profileForm.password !== profileForm.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors)
      return
    }

    setSubmitting(true)
    try {
      const updateData = {
        name: profileForm.name.trim(),
        email: profileForm.email,
        company: profileForm.company,
      }

      // Only include password if it's provided
      if (profileForm.password) {
        updateData.password = profileForm.password
      }

      await updateUser(updateData)
      setEditing(false)
      setFormErrors({})

      // Reset password fields
      setProfileForm(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }))
    } catch (error) {
      setFormErrors({ general: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Profile Settings</h2>
                {!editing && (
                  <button
                    onClick={handleEditProfile}
                    className="btn btn-secondary"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {formErrors.general && (
                <div className="error-message general-error" style={{ marginBottom: '1rem' }}>
                  {formErrors.general}
                </div>
              )}

              <div className="settings-form">
                {editing ? (
                  <>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                        className={formErrors.name ? 'error' : ''}
                      />
                      {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        className={formErrors.email ? 'error' : ''}
                      />
                      {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label>{userType === 'founder' ? 'Company Name' : 'Investment Firm'}</label>
                      <input
                        type="text"
                        name="company"
                        value={profileForm.company}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>New Password (leave blank to keep current)</label>
                      <input
                        type="password"
                        name="password"
                        value={profileForm.password}
                        onChange={handleProfileChange}
                        placeholder="Enter new password"
                        className={formErrors.password ? 'error' : ''}
                      />
                      {formErrors.password && <span className="error-message">{formErrors.password}</span>}
                    </div>

                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={profileForm.confirmPassword}
                        onChange={handleProfileChange}
                        placeholder="Confirm new password"
                        className={formErrors.confirmPassword ? 'error' : ''}
                      />
                      {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button
                        onClick={handleSaveProfile}
                        disabled={submitting}
                        className="btn btn-primary"
                      >
                        {submitting ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={submitting}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={data.name}
                        disabled
                        style={{ background: '#f8fafc' }}
                      />
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={data.email}
                        disabled
                        style={{ background: '#f8fafc' }}
                      />
                    </div>

                    <div className="form-group">
                      <label>{userType === 'founder' ? 'Company Name' : 'Investment Firm'}</label>
                      <input
                        type="text"
                        value={data.company}
                        disabled
                        style={{ background: '#f8fafc' }}
                      />
                    </div>

                    <div className="form-group">
                      <label>Account Type</label>
                      <input
                        type="text"
                        value={userType === 'founder' ? 'Founder' : 'Investor'}
                        disabled
                        style={{ background: '#f8fafc', textTransform: 'capitalize' }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                      <button
                        onClick={handleLogout}
                        className="btn btn-outline"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

