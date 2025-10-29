import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

export default function StartupDetailModal({ startup, isOpen, onClose, onContact }) {
  if (!isOpen || !startup) return null

  const [activeTab, setActiveTab] = useState('overview')

  // Helper function to format currency
  const formatCurrency = (amount) => {
    // Convert to Indian Rupees (assuming 1 USD = 83 INR approx)
    const rupees = amount * 83
    if (rupees >= 10000000) {
      return `₹${(rupees / 10000000).toFixed(1)}Cr`
    } else if (rupees >= 100000) {
      return `₹${(rupees / 100000).toFixed(1)}L`
    } else if (rupees >= 1000) {
      return `₹${(rupees / 1000).toFixed(0)}K`
    }
    return `₹${rupees.toLocaleString('en-IN')}`
  }

  // Helper function to create pie chart data (keep USD values for proper scaling)
  const createPieChartData = (startup) => {
    const raised = startup.fundingRaised // USD value
    const remaining = startup.fundingGoal - startup.fundingRaised // USD value
    return [
      { name: 'Raised', value: raised, color: '#667eea' },
      { name: 'Remaining', value: remaining, color: '#e2e8f0' }
    ]
  }

  // Create investor distribution chart data (keep USD values, will be formatted in INR by tooltip)
  const investorChartData = startup.investorsList?.map(investor => ({
    name: investor.name,
    amount: investor.amount, // Keep USD values, formatCurrency will convert them
    percentage: investor.percentage
  })) || []

  // Create funding timeline data (keep USD values)
  const fundingTimeline = [
    { quarter: 'Q1 2023', amount: 500000 },
    { quarter: 'Q2 2023', amount: 800000 },
    { quarter: 'Q3 2023', amount: 1200000 },
    { quarter: 'Q4 2023', amount: startup.fundingRaised }
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content startup-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="startup-header-info">
            <h2>{startup.name}</h2>
            <div className="startup-badges">
              <span className="startup-category">{startup.category}</span>
              <span className="startup-stage">{startup.stage}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'funding' ? 'active' : ''}`}
            onClick={() => setActiveTab('funding')}
          >
            Funding
          </button>
          <button 
            className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            Team
          </button>
          <button 
            className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </button>
          <button 
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>
        
        <div className="modal-body">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="startup-description">
                <h3>About {startup.name}</h3>
                <p>{startup.description}</p>
              </div>

              <div className="key-metrics-grid">
                <div className="metric-card">
                  <h4>Revenue</h4>
                  <div className="metric-value">{startup.keyMetrics.revenue}</div>
                </div>
                <div className="metric-card">
                  <h4>Growth Rate</h4>
                  <div className="metric-value">{startup.keyMetrics.growth}</div>
                </div>
                <div className="metric-card">
                  <h4>Customers</h4>
                  <div className="metric-value">{startup.keyMetrics.customers}</div>
                </div>
                <div className="metric-card">
                  <h4>Churn Rate</h4>
                  <div className="metric-value">{startup.keyMetrics.churn}</div>
                </div>
              </div>

              <div className="traction-section">
                <h3>Achievements & Traction</h3>
                <ul className="traction-list">
                  {startup.traction.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'funding' && (
            <div className="funding-content">
              <div className="funding-charts">
                <div className="chart-section">
                  <h3>Funding Progress</h3>
                  <div className="pie-chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={createPieChartData(startup)}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {createPieChartData(startup).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="funding-summary">
                  <div className="funding-stats">
                    <div className="funding-stat">
                      <span className="stat-label">Total Raised</span>
                      <span className="stat-value raised">{formatCurrency(startup.fundingRaised)}</span>
                    </div>
                    <div className="funding-stat">
                      <span className="stat-label">Funding Goal</span>
                      <span className="stat-value goal">{formatCurrency(startup.fundingGoal)}</span>
                    </div>
                    <div className="funding-stat">
                      <span className="stat-label">Remaining</span>
                      <span className="stat-value remaining">{formatCurrency(startup.fundingGoal - startup.fundingRaised)}</span>
                    </div>
                    <div className="funding-stat">
                      <span className="stat-label">Progress</span>
                      <span className="stat-value progress">{Math.round((startup.fundingRaised / startup.fundingGoal) * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="investors-section">
                <h3>Current Investors</h3>
                <div className="investors-chart">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={investorChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                      <YAxis hide />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Bar dataKey="amount" fill="#667eea" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="investors-list">
                  {startup.investorsList?.map((investor, index) => (
                    <div key={index} className="investor-item">
                      <div className="investor-info">
                        <h4>{investor.name}</h4>
                        <p>{investor.firm}</p>
                      </div>
                      <div className="investor-investment">
                        <span className="investment-amount">{formatCurrency(investor.amount)}</span>
                        <span className="investment-percentage">{investor.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="team-content">
              <h3>Leadership Team</h3>
              <div className="team-grid">
                {startup.team.map((member, index) => (
                  <div key={index} className="team-member-card">
                    <div className="member-avatar">
                      {member.name.charAt(0)}
                    </div>
                    <div className="member-details">
                      <h4>{member.name}</h4>
                      <p className="member-role">{member.role}</p>
                      <p className="member-experience">{member.experience}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="documents-content">
              <h3>Company Documents</h3>
              <div className="documents-grid">
                <div className="document-card">
                  <div className="document-icon">📊</div>
                  <div className="document-info">
                    <h4>Financial Statements</h4>
                    <p>Q3 2024 Financial Report</p>
                    <button className="btn btn-secondary">Download PDF</button>
                  </div>
                </div>
                <div className="document-card">
                  <div className="document-icon">📋</div>
                  <div className="document-info">
                    <h4>Business Plan</h4>
                    <p>Detailed business strategy and projections</p>
                    <button className="btn btn-secondary">View Document</button>
                  </div>
                </div>
                <div className="document-card">
                  <div className="document-icon">📈</div>
                  <div className="document-info">
                    <h4>Pitch Deck</h4>
                    <p>Investment presentation slides</p>
                    <button className="btn btn-secondary">View Slides</button>
                  </div>
                </div>
                <div className="document-card">
                  <div className="document-icon">⚖️</div>
                  <div className="document-info">
                    <h4>Legal Documents</h4>
                    <p>Incorporation papers and contracts</p>
                    <button className="btn btn-secondary">View Documents</button>
                  </div>
                </div>
                <div className="document-card">
                  <div className="document-icon">🔒</div>
                  <div className="document-info">
                    <h4>IP Portfolio</h4>
                    <p>Patents and intellectual property</p>
                    <button className="btn btn-secondary">View Portfolio</button>
                  </div>
                </div>
                <div className="document-card">
                  <div className="document-icon">📊</div>
                  <div className="document-info">
                    <h4>Market Analysis</h4>
                    <p>Industry research and competitive analysis</p>
                    <button className="btn btn-secondary">View Analysis</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="analytics-content">
              <h3>Performance Analytics</h3>
              <div className="analytics-charts">
                <div className="chart-section">
                  <h4>Funding Timeline</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={fundingTimeline}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis hide />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Bar dataKey="amount" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="chart-section">
                  <h4>Revenue Growth</h4>
                  <div className="growth-metrics">
                    <div className="growth-metric">
                      <span className="growth-label">Monthly Growth</span>
                      <span className="growth-value">+15%</span>
                    </div>
                    <div className="growth-metric">
                      <span className="growth-label">Customer Acquisition</span>
                      <span className="growth-value">+25%</span>
                    </div>
                    <div className="growth-metric">
                      <span className="growth-label">Market Share</span>
                      <span className="growth-value">+8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={() => onContact(startup)}>
            Request Contact
          </button>
          <button className="btn btn-secondary">
            Schedule Meeting
          </button>
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
