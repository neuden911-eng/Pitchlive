import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import ProfileDropdown from './ProfileDropdown'
import { useAuth } from '../hooks/useAuth.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/verification'

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    if (!isAuthPage) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [isAuthPage])

  if (isAuthPage) {
    return null // Hide navbar on auth pages
  }

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="container">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo size="small" />
        </Link>
        <ul>
          <li><Link to="/how-it-works">How It Works</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/users">For Users</Link></li>
          <li><Link to="/technology">Technology</Link></li>
          {isLoggedIn ? (
            <li><ProfileDropdown /></li>
          ) : (
            <>
              <li><Link to="/login" className="btn btn-secondary"><span>Login</span></Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}


