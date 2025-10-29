import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

export default function Dashboard() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 0', background: 'var(--bg-light)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <Logo size="large" />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', marginTop: '2rem', marginBottom: '1rem' }}>
            Welcome to Your Dashboard
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
            Manage your account, view statistics, and track your progress!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/profile" className="btn btn-primary">View Profile</Link>
            <Link to="/" className="btn btn-secondary">Go Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

