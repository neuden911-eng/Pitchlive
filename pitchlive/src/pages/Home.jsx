import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackgroundAnimation from '../components/BackgroundAnimation'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'
import UserTypes from '../components/UserTypes'
import Technology from '../components/Technology'
import CTA from '../components/CTA'
import Logo from '../components/Logo'
import ThemeToggle from '../components/ThemeToggle'
import StartupDetailModal from '../components/StartupDetailModal'
import MessagingSystem from '../components/MessagingSystem'
import ChatWidget from '../components/ChatWidget'

export default function Home() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState('')
  const [userName, setUserName] = useState('')
  const [selectedStartup, setSelectedStartup] = useState(null)
  const [filterCategory, setFilterCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [showMessaging, setShowMessaging] = useState(false)
  const [selectedStartupForMessaging, setSelectedStartupForMessaging] = useState(null)

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    const type = localStorage.getItem('userType')
    const name = localStorage.getItem('userName')
    
    if (loggedIn === 'true' && type && name) {
      setIsLoggedIn(true)
      setUserType(type)
      setUserName(name)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userType')
    localStorage.removeItem('userName')
    setIsLoggedIn(false)
    setUserType('')
    setUserName('')
  }

  const handleContactRequest = (startup) => {
    setSelectedStartupForMessaging(startup)
    setShowMessaging(true)
  }

  const handleOpenConversation = (conversation) => {
    // Find the startup data for this conversation
    const startup = fundedStartups.find(s => s.id === conversation.startupId)
    if (startup) {
      setSelectedStartupForMessaging(startup)
      setShowMessaging(true)
    }
  }

  // Mock startup data (only funded startups)
  const fundedStartups = [
    {
      id: 1,
      name: 'TechFlow Solutions',
      tagline: 'AI-powered workflow automation for enterprises',
      category: 'AI/ML',
      stage: 'Series A',
      fundingRaised: 2500000,
      fundingGoal: 5000000,
      investors: 12,
      founded: '2022',
      employees: '15-25',
      location: 'San Francisco, CA',
      description: 'TechFlow Solutions is revolutionizing enterprise workflow management through advanced AI algorithms. Our platform helps companies automate complex business processes, reducing manual work by 70% and increasing productivity.',
      keyMetrics: {
        revenue: '₹4.1Cr ARR',
        growth: '150% YoY',
        customers: '50+',
        churn: '5%'
      },
      team: [
        { name: 'Sarah Chen', role: 'CEO', experience: 'Ex-Google, Stanford MBA' },
        { name: 'Michael Rodriguez', role: 'CTO', experience: 'Ex-Microsoft, PhD AI' }
      ],
      traction: [
        'Featured in TechCrunch',
        'Partnership with Salesforce',
        'Won Startup Battlefield',
        '500+ enterprise trials'
      ],
      investorsList: [
        { name: 'Sarah Mitchell', firm: 'TechVenture Capital', amount: 500000, percentage: 20 },
        { name: 'David Park', firm: 'Innovation Fund', amount: 400000, percentage: 16 },
        { name: 'Lisa Wang', firm: 'Future Ventures', amount: 350000, percentage: 14 },
        { name: 'Alex Thompson', firm: 'Angel Investors', amount: 300000, percentage: 12 },
        { name: 'Maria Gonzalez', firm: 'Growth Capital', amount: 250000, percentage: 10 },
        { name: 'Kevin Zhang', firm: 'Tech Angels', amount: 200000, percentage: 8 },
        { name: 'Rachel Brown', firm: 'Startup Fund', amount: 150000, percentage: 6 },
        { name: 'James Wilson', firm: 'Venture Partners', amount: 100000, percentage: 4 },
        { name: 'Priya Patel', firm: 'Seed Capital', amount: 100000, percentage: 4 },
        { name: 'Jennifer Liu', firm: 'Early Stage VC', amount: 100000, percentage: 4 },
        { name: 'Robert Kim', firm: 'Tech Fund', amount: 50000, percentage: 2 },
        { name: 'Michael Chen', firm: 'Angel Network', amount: 50000, percentage: 2 }
      ]
    },
    {
      id: 2,
      name: 'GreenTech Innovations',
      tagline: 'Sustainable energy solutions for smart cities',
      category: 'CleanTech',
      stage: 'Seed',
      fundingRaised: 1200000,
      fundingGoal: 3000000,
      investors: 8,
      founded: '2023',
      employees: '8-15',
      location: 'Austin, TX',
      description: 'GreenTech Innovations develops cutting-edge renewable energy solutions for urban environments. Our smart grid technology helps cities reduce carbon footprint while improving energy efficiency.',
      keyMetrics: {
        revenue: '₹1.7Cr ARR',
        growth: '300% YoY',
        customers: '15+',
        churn: '2%'
      },
      team: [
        { name: 'David Park', role: 'CEO', experience: 'Ex-Tesla, MIT Engineering' },
        { name: 'Lisa Wang', role: 'COO', experience: 'Ex-GE, Harvard MBA' }
      ],
      traction: [
        'Pilot with Austin Energy',
        'EPA Innovation Award',
        'Featured in GreenBiz',
        '200+ city inquiries'
      ],
      investorsList: [
        { name: 'Sarah Mitchell', firm: 'TechVenture Capital', amount: 300000, percentage: 25 },
        { name: 'David Park', firm: 'Green Energy Fund', amount: 250000, percentage: 21 },
        { name: 'Lisa Wang', firm: 'Sustainable Ventures', amount: 200000, percentage: 17 },
        { name: 'Alex Thompson', firm: 'CleanTech Angels', amount: 150000, percentage: 12 },
        { name: 'Maria Gonzalez', firm: 'Eco Capital', amount: 100000, percentage: 8 },
        { name: 'Kevin Zhang', firm: 'Green Fund', amount: 100000, percentage: 8 },
        { name: 'Rachel Brown', firm: 'Climate Ventures', amount: 50000, percentage: 4 },
        { name: 'James Wilson', firm: 'Energy Angels', amount: 50000, percentage: 4 }
      ]
    },
    {
      id: 3,
      name: 'HealthSync Pro',
      tagline: 'Telemedicine platform connecting patients with specialists',
      category: 'HealthTech',
      stage: 'Series B',
      fundingRaised: 8000000,
      fundingGoal: 12000000,
      investors: 18,
      founded: '2021',
      employees: '30-50',
      location: 'Boston, MA',
      description: 'HealthSync Pro is transforming healthcare delivery through advanced telemedicine technology. Our platform connects patients with specialized healthcare providers, improving access to quality care.',
      keyMetrics: {
        revenue: '₹16.6Cr ARR',
        growth: '200% YoY',
        customers: '200+',
        churn: '8%'
      },
      team: [
        { name: 'Dr. Jennifer Liu', role: 'CEO', experience: 'Ex-Johns Hopkins, MD' },
        { name: 'Robert Kim', role: 'CTO', experience: 'Ex-Amazon, Stanford CS' }
      ],
      traction: [
        'HIPAA Compliant',
        'Partnership with Mayo Clinic',
        'FDA Approval Pending',
        '10K+ patient consultations'
      ],
      investorsList: [
        { name: 'Sarah Mitchell', firm: 'TechVenture Capital', amount: 2000000, percentage: 25 },
        { name: 'David Park', firm: 'HealthTech Fund', amount: 1500000, percentage: 19 },
        { name: 'Lisa Wang', firm: 'Medical Ventures', amount: 1200000, percentage: 15 },
        { name: 'Alex Thompson', firm: 'Healthcare Angels', amount: 1000000, percentage: 12 },
        { name: 'Maria Gonzalez', firm: 'Bio Capital', amount: 800000, percentage: 10 },
        { name: 'Kevin Zhang', firm: 'MedTech Fund', amount: 600000, percentage: 8 },
        { name: 'Rachel Brown', firm: 'Health Ventures', amount: 400000, percentage: 5 },
        { name: 'James Wilson', firm: 'Medical Angels', amount: 300000, percentage: 4 },
        { name: 'Priya Patel', firm: 'Health Capital', amount: 200000, percentage: 2 }
      ]
    },
    {
      id: 4,
      name: 'EduTech Dynamics',
      tagline: 'Personalized learning platform for K-12 education',
      category: 'EdTech',
      stage: 'Series A',
      fundingRaised: 3800000,
      fundingGoal: 6000000,
      investors: 14,
      founded: '2022',
      employees: '20-35',
      location: 'Seattle, WA',
      description: 'EduTech Dynamics creates adaptive learning experiences that personalize education for every student. Our AI-driven platform identifies learning gaps and provides targeted interventions.',
      keyMetrics: {
        revenue: '₹6.6Cr ARR',
        growth: '180% YoY',
        customers: '75+',
        churn: '6%'
      },
      team: [
        { name: 'Maria Gonzalez', role: 'CEO', experience: 'Ex-Pearson, EdD' },
        { name: 'James Wilson', role: 'CTO', experience: 'Ex-Facebook, PhD ML' }
      ],
      traction: [
        'Used in 50+ schools',
        'Improves test scores by 25%',
        'Featured in EdWeek',
        '1M+ learning sessions'
      ],
      investorsList: [
        { name: 'Sarah Mitchell', firm: 'TechVenture Capital', amount: 800000, percentage: 21 },
        { name: 'David Park', firm: 'Education Fund', amount: 600000, percentage: 16 },
        { name: 'Lisa Wang', firm: 'Learning Ventures', amount: 500000, percentage: 13 },
        { name: 'Alex Thompson', firm: 'EdTech Angels', amount: 400000, percentage: 11 },
        { name: 'Maria Gonzalez', firm: 'Growth Capital', amount: 350000, percentage: 9 },
        { name: 'Kevin Zhang', firm: 'Tech Angels', amount: 300000, percentage: 8 },
        { name: 'Rachel Brown', firm: 'Startup Fund', amount: 250000, percentage: 7 },
        { name: 'James Wilson', firm: 'Venture Partners', amount: 200000, percentage: 5 },
        { name: 'Priya Patel', firm: 'Seed Capital', amount: 150000, percentage: 4 },
        { name: 'Jennifer Liu', firm: 'Early Stage VC', amount: 100000, percentage: 3 },
        { name: 'Robert Kim', firm: 'Tech Fund', amount: 100000, percentage: 3 }
      ]
    },
    {
      id: 5,
      name: 'CryptoVault Security',
      tagline: 'Blockchain-based digital asset protection platform',
      category: 'Blockchain',
      stage: 'Seed',
      fundingRaised: 1800000,
      fundingGoal: 4000000,
      investors: 10,
      founded: '2023',
      employees: '12-20',
      location: 'New York, NY',
      description: 'CryptoVault Security provides enterprise-grade security solutions for digital assets and blockchain infrastructure. Our platform ensures maximum protection for crypto investments.',
      keyMetrics: {
        revenue: '₹2.5Cr ARR',
        growth: '250% YoY',
        customers: '25+',
        churn: '3%'
      },
      team: [
        { name: 'Alex Thompson', role: 'CEO', experience: 'Ex-Coinbase, Blockchain Expert' },
        { name: 'Priya Patel', role: 'CTO', experience: 'Ex-ConsenSys, Security PhD' }
      ],
      traction: [
        'SOC 2 Compliant',
        'Partnership with Binance',
        'Featured in CoinDesk',
        '$50M+ assets secured'
      ],
      investorsList: [
        { name: 'Sarah Mitchell', firm: 'TechVenture Capital', amount: 400000, percentage: 22 },
        { name: 'David Park', firm: 'Crypto Fund', amount: 350000, percentage: 19 },
        { name: 'Lisa Wang', firm: 'Blockchain Ventures', amount: 300000, percentage: 17 },
        { name: 'Alex Thompson', firm: 'Crypto Angels', amount: 250000, percentage: 14 },
        { name: 'Maria Gonzalez', firm: 'Digital Capital', amount: 200000, percentage: 11 },
        { name: 'Kevin Zhang', firm: 'Blockchain Fund', amount: 150000, percentage: 8 },
        { name: 'Rachel Brown', firm: 'Crypto Ventures', amount: 100000, percentage: 6 },
        { name: 'James Wilson', firm: 'Digital Angels', amount: 75000, percentage: 4 }
      ]
    },
    {
      id: 6,
      name: 'GameForge Studios',
      tagline: 'Next-generation mobile gaming with AI-powered characters',
      category: 'Gaming',
      stage: 'Series A',
      fundingRaised: 4500000,
      fundingGoal: 8000000,
      investors: 16,
      founded: '2021',
      employees: '25-40',
      location: 'Los Angeles, CA',
      description: 'GameForge Studios creates immersive mobile games with AI-powered NPCs that learn and adapt to player behavior, creating unique gaming experiences.',
      keyMetrics: {
        revenue: '₹10Cr ARR',
        growth: '220% YoY',
        customers: '500K+',
        churn: '15%'
      },
      team: [
        { name: 'Kevin Zhang', role: 'CEO', experience: 'Ex-EA Games, Gaming Expert' },
        { name: 'Rachel Brown', role: 'CTO', experience: 'Ex-Blizzard, AI Specialist' }
      ],
      traction: [
        'Featured in App Store',
        'Partnership with Unity',
        'Won Game Developer Award',
        '10M+ downloads'
      ],
      investorsList: [
        { name: 'Sarah Mitchell', firm: 'TechVenture Capital', amount: 900000, percentage: 20 },
        { name: 'David Park', firm: 'Gaming Fund', amount: 800000, percentage: 18 },
        { name: 'Lisa Wang', firm: 'Entertainment Ventures', amount: 700000, percentage: 16 },
        { name: 'Alex Thompson', firm: 'Gaming Angels', amount: 600000, percentage: 13 },
        { name: 'Maria Gonzalez', firm: 'Media Capital', amount: 500000, percentage: 11 },
        { name: 'Kevin Zhang', firm: 'Gaming Fund', amount: 400000, percentage: 9 },
        { name: 'Rachel Brown', firm: 'Entertainment Ventures', amount: 300000, percentage: 7 },
        { name: 'James Wilson', firm: 'Gaming Angels', amount: 200000, percentage: 4 },
        { name: 'Priya Patel', firm: 'Media Capital', amount: 100000, percentage: 2 }
      ]
    }
  ]

  const categories = ['all', 'AI/ML', 'CleanTech', 'HealthTech', 'EdTech', 'FinTech', 'E-commerce', 'SaaS', 'Blockchain', 'IoT', 'Cybersecurity', 'Gaming', 'Real Estate', 'Transportation', 'FoodTech', 'AgriTech', 'SpaceTech', 'Robotics', 'VR/AR', 'Social Media', 'Entertainment']

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

  // Helper function to create pie chart data
  const createPieChartData = (startup) => {
    const raised = startup.fundingRaised
    const remaining = startup.fundingGoal - raised
    return [
      { name: 'Raised', value: raised, color: '#667eea' },
      { name: 'Remaining', value: remaining, color: '#e2e8f0' }
    ]
  }

  const filteredAndSortedStartups = fundedStartups
    .filter(startup => {
      const matchesCategory = filterCategory === 'all' || startup.category === filterCategory
      const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           startup.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           startup.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'fundingRaised':
          aValue = a.fundingRaised
          bValue = b.fundingRaised
          break
        case 'fundingGoal':
          aValue = a.fundingGoal
          bValue = b.fundingGoal
          break
        case 'progress':
          aValue = (a.fundingRaised / a.fundingGoal) * 100
          bValue = (b.fundingRaised / b.fundingGoal) * 100
          break
        case 'investors':
          aValue = a.investors
          bValue = b.investors
          break
        case 'category':
          aValue = a.category
          bValue = b.category
          break
        case 'stage':
          aValue = a.stage
          bValue = b.stage
          break
        default:
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  if (isLoggedIn) {
    return (
      <div className="home-dashboard">
        <div className="dashboard-header">
          <div className="container">
            <div className="dashboard-nav">
              <Logo size="small" />
              <div className="dashboard-nav-right">
                <span className="welcome-text">Welcome, {userName}!</span>
                <ThemeToggle />
                <button onClick={handleLogout} className="btn btn-outline">Logout</button>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="container">
            <div className="dashboard-title">
              <h1>{userType === 'investor' ? 'Investor Dashboard' : 'Founder Dashboard'}</h1>
              <p>{userType === 'investor' ? 'Discover funded startups and investment opportunities' : 'Manage your startup and connect with investors'}</p>
            </div>

            {userType === 'investor' && (
              <>
                <div className="dashboard-filters">
                  <div className="search-bar">
                    <input
                      type="text"
                      placeholder="Search funded startups..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="search-icon">🔍</span>
                  </div>
                  
                  <div className="filter-controls">
                    <div className="category-filters">
                      {categories.map(category => (
                        <button
                          key={category}
                          className={`filter-btn ${filterCategory === category ? 'active' : ''}`}
                          onClick={() => setFilterCategory(category)}
                        >
                          {category === 'all' ? 'All Categories' : category}
                        </button>
                      ))}
                    </div>
                    
                    <div className="sort-controls">
                      <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                      >
                        <option value="name">Sort by Name</option>
                        <option value="fundingRaised">Sort by Funding Raised</option>
                        <option value="fundingGoal">Sort by Funding Goal</option>
                        <option value="progress">Sort by Progress</option>
                        <option value="investors">Sort by Investors</option>
                        <option value="category">Sort by Category</option>
                        <option value="stage">Sort by Stage</option>
                      </select>
                      
                      <button 
                        className={`sort-order-btn ${sortOrder === 'asc' ? 'active' : ''}`}
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="startups-grid">
                  {filteredAndSortedStartups.map(startup => (
                    <div key={startup.id} className="startup-card" onClick={() => setSelectedStartup(startup)}>
                      <div className="startup-header">
                        <div className="startup-category">{startup.category}</div>
                        <div className="startup-stage">{startup.stage}</div>
                      </div>
                      
                      <h3 className="startup-name">{startup.name}</h3>
                      <p className="startup-tagline">{startup.tagline}</p>
                      
                      <div className="startup-metrics">
                        <div className="metric">
                          <span className="metric-label">Funding Raised</span>
                          <span className="metric-value">{formatCurrency(startup.fundingRaised)}</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Goal</span>
                          <span className="metric-value">{formatCurrency(startup.fundingGoal)}</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Progress</span>
                          <span className="metric-value">{Math.round((startup.fundingRaised / startup.fundingGoal) * 100)}%</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Investors</span>
                          <span className="metric-value">{startup.investors}</span>
                        </div>
                      </div>

                      <div className="startup-details">
                        <div className="detail">
                          <span className="detail-icon">📍</span>
                          <span>{startup.location}</span>
                        </div>
                        <div className="detail">
                          <span className="detail-icon">👥</span>
                          <span>{startup.employees} employees</span>
                        </div>
                        <div className="detail">
                          <span className="detail-icon">📅</span>
                          <span>Founded {startup.founded}</span>
                        </div>
                      </div>

                      <div className="startup-actions">
                        <button className="btn btn-primary" onClick={() => setSelectedStartup(startup)}>View Details</button>
                        <button className="btn btn-secondary" onClick={() => handleContactRequest(startup)}>Contact</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {userType === 'founder' && (
              <div className="founder-dashboard-content">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                      <h3>Total Raised</h3>
                      <div className="stat-value">$2.5M</div>
                      <p className="stat-description">From all funding rounds</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-content">
                      <h3>Funding Goal</h3>
                      <div className="stat-value">$5M</div>
                      <p className="stat-description">Current round target</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                      <h3>Active Pitches</h3>
                      <div className="stat-value">5</div>
                      <p className="stat-description">Currently pitching</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                      <h3>Successful Deals</h3>
                      <div className="stat-value">3</div>
                      <p className="stat-description">Deals closed</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Startup Detail Modal */}
        <StartupDetailModal 
          startup={selectedStartup}
          isOpen={!!selectedStartup}
          onClose={() => setSelectedStartup(null)}
          onContact={handleContactRequest}
        />

        {/* Messaging System */}
        <MessagingSystem 
          isOpen={showMessaging}
          onClose={() => setShowMessaging(false)}
          startup={selectedStartupForMessaging}
          currentUser={{ name: userName, type: userType }}
        />

        {/* Chat Widget - Only show for investors */}
        {isLoggedIn && userType === 'investor' && (
          <ChatWidget 
            currentUser={{ name: userName, type: userType }}
            onOpenConversation={handleOpenConversation}
          />
        )}
      </div>
    )
  }

  return (
    <>
      <BackgroundAnimation />
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <UserTypes />
      <Technology />
      <CTA />
    </>
  )
}

