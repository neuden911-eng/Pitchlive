import { useEffect, useRef } from 'react'

export default function UserTypes() {
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

  const founderFeatures = [
    'Verify with KYC + startup registration',
    'Get verified badge ✅ for credibility',
    'Upload pitch decks (visible to verified investors only)',
    'Auto-generated NDAs for pitch requests',
    'Schedule video pitch meetings instantly',
    'Escrow protection for secure funding',
    'Earn Trust Score +1 for successful deals',
    'Smart equity calculator & term sheet tools',
    'Track funding progress and analytics',
    'Real-time messaging with investors'
  ]

  const investorFeatures = [
    'Verify identity + source of funds',
    'Get verified investor badge ✅',
    'Access verified founders\' pitch decks only',
    'Auto-signed NDAs before deck access',
    'Book one-on-one video pitch sessions',
    'Escrow system - funds locked until milestones',
    'Earn Trust Score +1 for successful deals',
    'Portfolio analytics & performance tracking',
    'Advanced search & filtering capabilities',
    'Secure payment processing & transactions'
  ]

  return (
    <section id="users" className="user-types">
      <div className="container">
        <h2 className="section-title fade-in">Built for Both Sides</h2>
        <p className="section-subtitle fade-in">Tailored experiences for founders and investors</p>
        <div className="types-container">
          <div 
            className="type-card fade-in"
            ref={el => refs.current[0] = el}
          >
            <h3>For Founders</h3>
            <ul>
              {founderFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <a href="#" className="btn btn-primary"><span>Start Pitching</span></a>
          </div>
          <div 
            className="type-card fade-in"
            ref={el => refs.current[1] = el}
          >
            <h3>For Investors</h3>
            <ul>
              {investorFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <a href="#" className="btn btn-primary"><span>Start Investing</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}


