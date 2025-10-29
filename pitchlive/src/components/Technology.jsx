import { useEffect, useRef } from 'react'

export default function Technology() {
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

  const techStack = [
    { icon: '💻', title: 'Frontend', description: 'React.js / Next.js with TypeScript and Tailwind CSS for a modern, responsive user experience' },
    { icon: '⚙️', title: 'Backend', description: 'Node.js with Express or Python Django, PostgreSQL database, and Redis for high-performance caching' },
    { icon: '🔌', title: 'Integrations', description: 'Stripe payments, Zoom/Google Meet video, AWS S3 storage, SendGrid emails, and Auth0 authentication' }
  ]

  return (
    <section id="tech" className="how-it-works">
      <div className="container">
        <h2 className="section-title fade-in">Technology Stack</h2>
        <p className="section-subtitle fade-in">Built with modern, scalable technologies</p>
        <div className="steps">
          {techStack.map((tech, index) => (
            <div 
              key={index}
              className="step fade-in"
              ref={el => refs.current[index] = el}
            >
              <div className="step-number">{tech.icon}</div>
              <h3>{tech.title}</h3>
              <p>{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


