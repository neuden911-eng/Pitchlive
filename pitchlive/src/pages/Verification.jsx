import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import '../styles/Auth.css'

export default function Verification() {
  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-gradient"></div>
      </div>
      
      <div className="auth-content">
        <div className="auth-card">
          <div className="auth-header">
            <Logo size="medium" />
            <h2>Check Your Email</h2>
            <p>We've sent a verification link to your email address</p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📧</div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Please check your inbox and click on the verification link to activate your account.
            </p>
          </div>

          <div className="auth-footer">
            <p>Didn't receive the email? <Link to="/resend-verification">Resend</Link></p>
            <p style={{ marginTop: '1rem' }}>
              <Link to="/login">Back to Login</Link> | <Link to="/profile">Go to Profile</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

