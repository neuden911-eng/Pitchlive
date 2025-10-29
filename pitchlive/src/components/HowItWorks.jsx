import { useEffect, useRef } from 'react'

export default function HowItWorks() {
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

  const founderSteps = [
    { number: '1', title: 'Sign Up', description: 'Create your founder account and start your verification process' },
    { number: '2', title: 'Upload KYC & Registration', description: 'Submit KYC documents and startup registration certificates for verification' },
    { number: '✅', title: 'Get Verified Badge', description: 'Receive your verified founder badge after successful verification' },
    { number: '📄', title: 'Upload Pitch Deck', description: 'Upload your pitch deck - visible only to verified investors for security' }
  ]

  const investorSteps = [
    { number: '1', title: 'Sign Up', description: 'Create your investor account and begin verification' },
    { number: '2', title: 'Verify Identity & Funds', description: 'Submit identity verification and source of funds documentation' },
    { number: '✅', title: 'Get Verified Badge', description: 'Receive your verified investor badge after successful verification' },
    { number: '🔍', title: 'Browse Verified Decks', description: 'Access pitch decks from verified founders only' }
  ]

  const dealSteps = [
    { number: '📋', title: 'Request Pitch', description: 'Investor requests a pitch meeting - NDA auto-generated and signed digitally' },
    { number: '💬', title: 'Discuss Deal', description: 'Negotiate terms, equity, and investment structure through secure platform' },
    { number: '🔒', title: 'Escrow Created', description: 'Funds locked in escrow until agreed milestones are achieved' },
    { number: '⭐', title: 'Earn Trust Score', description: 'Both parties receive +1 Trust Score for successful deal completion' }
  ]

  return (
    <section id="how" className="how-it-works">
      <div className="container">
        <h2 className="section-title fade-in">How It Works</h2>
        <p className="section-subtitle fade-in">Secure, verified, and trust-based fundraising process</p>
        
        {/* Founder Workflow */}
        <div style={{marginTop: '4rem'}}>
          <h3 style={{textAlign: 'center', fontSize: '1.75rem', marginBottom: '3rem', color: 'var(--text-primary)', fontWeight: '700'}}>Founder Journey</h3>
          <div className="steps">
            {founderSteps.map((step, index) => (
              <div 
                key={index}
                className="step fade-in"
                ref={el => refs.current[index] = el}
              >
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Investor Workflow */}
        <div style={{marginTop: '5rem'}}>
          <h3 style={{textAlign: 'center', fontSize: '1.75rem', marginBottom: '3rem', color: 'var(--text-primary)', fontWeight: '700'}}>Investor Journey</h3>
          <div className="steps">
            {investorSteps.map((step, index) => (
              <div 
                key={index + 4}
                className="step fade-in"
                ref={el => refs.current[index + 4] = el}
              >
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deal Process */}
        <div style={{marginTop: '5rem'}}>
          <h3 style={{textAlign: 'center', fontSize: '1.75rem', marginBottom: '3rem', color: 'var(--text-primary)', fontWeight: '700'}}>Secure Deal Process</h3>
          <div className="steps">
            {dealSteps.map((step, index) => (
              <div 
                key={index + 8}
                className="step fade-in"
                ref={el => refs.current[index + 8] = el}
              >
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


