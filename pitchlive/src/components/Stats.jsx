import { useEffect, useRef } from 'react'

export default function Stats() {
  const statRefs = useRef([])

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

    statRefs.current.forEach(el => {
      if (el) observer.observe(el)
    })

    return () => {
      statRefs.current.forEach(el => {
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  const stats = [
    { number: '$2.5B+', label: 'Funds Raised' },
    { number: '5,000+', label: 'Active Startups' },
    { number: '1,200+', label: 'Verified Investors' },
    { number: '15,000+', label: 'Successful Pitches' }
  ]

  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-item fade-in"
              ref={el => statRefs.current[index] = el}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


