import { useEffect, useRef } from 'react'

export default function CTA() {
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

  return (
    <section className="cta">
      <div className="container">
        <h2 className="fade-in" ref={el => refs.current[0] = el}>Ready to Get Started?</h2>
        <p className="fade-in" ref={el => refs.current[1] = el}>Join thousands of founders and investors already using PitchLive</p>
        <div className="hero-buttons fade-in" ref={el => refs.current[2] = el}>
          <a href="#" className="btn btn-primary"><span>Sign Up Now</span></a>
          <a href="#" className="btn btn-secondary"><span>Schedule a Demo</span></a>
        </div>
      </div>
    </section>
  )
}


