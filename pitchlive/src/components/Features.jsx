import { useEffect, useRef } from 'react'

export default function Features() {
  const refs = useRef([])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    refs.current.forEach(el => {
      if (el) observer.observe(el)
    })

    return () => {
      refs.current.forEach(el => {
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  const securityFeatures = [
    { icon: '✅', title: 'Dual Verification System', description: 'Founders verify with KYC + startup registration. Investors verify identity + source of funds. Both receive verified badges' },
    { icon: '🔐', title: 'Private Deck Access', description: 'Pitch decks are visible only to verified investors, ensuring security and preventing unauthorized access' },
    { icon: '📋', title: 'Auto-Generated NDAs', description: 'When investors request pitches, NDAs are automatically generated and signed digitally before access' },
    { icon: '🔒', title: 'Escrow Protection', description: 'Funds locked in escrow until agreed milestones are achieved, protecting both founders and investors' },
    { icon: '⭐', title: 'Trust Score System', description: 'Earn Trust Score +1 for successful deals. Build reputation and credibility on the platform' },
    { icon: '🛡️', title: 'Milestone-Based Release', description: 'Funds released automatically when milestones are achieved, ensuring accountability and progress' }
  ]

  const mvpFeatures = [
    { icon: '👤', title: 'User Authentication', description: 'Separate authentication systems for founders and investors with secure login and profile management' },
    { icon: '📋', title: 'Profile Creation', description: 'Complete profile setup with credentials, company details, and investment preferences' },
    { icon: '📄', title: 'Pitch Deck Upload', description: 'Upload and manage pitch decks and business plans securely on the platform' },
    { icon: '📅', title: 'Meeting Scheduler', description: 'Simple, intuitive calendar system to schedule one-on-one pitch meetings' },
    { icon: '📊', title: 'Equity Calculator', description: 'Automatically calculate equity stakes based on investment amount and company valuation' },
    { icon: '📝', title: 'Investment Slip Generator', description: 'Generate, sign, and manage investment agreements securely on the platform' }
  ]

  const enhancedFeatures = [
    { icon: '🎥', title: 'Video Conferencing', description: 'Integrated Zoom and Google Meet API for seamless video pitch sessions' },
    { icon: '🔍', title: 'Advanced Search & Filtering', description: 'Powerful search tools to find startups by industry, stage, size, and investment criteria' },
    { icon: '💬', title: 'Messaging System', description: 'Secure messaging platform for real-time communication between founders and investors' },
    { icon: '✍️', title: 'Document Signing', description: 'DocuSign and HelloSign integration for legally binding digital signatures' },
    { icon: '💳', title: 'Payment Gateway', description: 'Stripe integration for secure payment processing and transaction management' },
    { icon: '📧', title: 'Email Notifications', description: 'Automated email notifications for meetings, deals, and important updates' }
  ]

  const advancedFeatures = [
    { icon: '🤖', title: 'AI-Powered Matching', description: 'Intelligent algorithm to connect founders with the right investors for their industry and stage' },
    { icon: '📈', title: 'Portfolio Analytics', description: 'Comprehensive dashboard with real-time analytics and performance tracking' },
    { icon: '📁', title: 'Due Diligence Vault', description: 'Secure document vault for storing and managing due diligence materials' },
    { icon: '🤝', title: 'Multi-Party Negotiations', description: 'Facilitate complex negotiations involving multiple investors and stakeholders' },
    { icon: '💱', title: 'Secondary Market', description: 'Secondary market platform for equity trading and liquidity management' },
    { icon: '📱', title: 'Mobile Apps', description: 'Native iOS and Android apps for on-the-go pitch management and deals' }
  ]

  const renderFeatures = (features, startIndex) => {
    return features.map((feature, index) => (
      <div 
        key={index}
        className="feature fade-in"
        ref={el => refs.current[startIndex + index] = el}
      >
        <div className="feature-icon">{feature.icon}</div>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    ))
  }

  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="section-title fade-in">Platform Features</h2>
        <p className="section-subtitle fade-in">Everything you need to connect, pitch, and secure funding</p>
        
        <h3 className="feature-subsection-title">Security & Trust Features</h3>
        <div className="features-grid">
          {renderFeatures(securityFeatures, 0)}
        </div>

        <h3 className="feature-subsection-title">Core MVP Features</h3>
        <div className="features-grid">
          {renderFeatures(mvpFeatures, 6)}
        </div>

        <h3 className="feature-subsection-title">Enhanced Features</h3>
        <div className="features-grid">
          {renderFeatures(enhancedFeatures, 12)}
        </div>

        <h3 className="feature-subsection-title">Advanced Platform Features</h3>
        <div className="features-grid">
          {renderFeatures(advancedFeatures, 18)}
        </div>
      </div>
    </section>
  )
}


