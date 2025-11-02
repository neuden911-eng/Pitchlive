import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Logo from '../components/Logo'
import ThemeToggle from '../components/ThemeToggle'
import { useAuth } from '../hooks/useAuth.js'
import '../styles/Auth.css'

export default function Verification() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('pending') // pending, verifying, success, error
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const { verifyEmail, resendVerificationEmail } = useAuth()

  useEffect(() => {
    // Check for token in URL params (email verification link)
    const token = searchParams.get('token')

    // Check for email from state (from signup redirect)
    const stateEmail = window.history?.state?.state?.email
    const stateMessage = window.history?.state?.state?.message

    if (stateEmail) {
      setEmail(stateEmail)
    }

    if (stateMessage) {
      setMessage(stateMessage)
    }

    if (token) {
      handleVerifyEmail(token)
    }
  }, [searchParams])

  const handleVerifyEmail = async (token) => {
    setStatus('verifying')
    try {
      const result = await verifyEmail(token)
      setStatus('success')
      setMessage(result.message || 'Email verified successfully! Redirecting to your dashboard...')

      // Redirect to appropriate dashboard after successful verification
      setTimeout(() => {
        const dashboardRoute = result.user?.userType === 'founder' ? '/founder-dashboard' : '/investor-dashboard'
        navigate(dashboardRoute)
      }, 2000)
    } catch (error) {
      setStatus('error')
      setMessage(error.message || 'Email verification failed. The link may have expired.')
    }
  }

  const handleResendEmail = async () => {
    if (!email) {
      setMessage('Please enter your email address')
      return
    }

    setSubmitting(true)
    try {
      const result = await resendVerificationEmail(email)
      setMessage(result.message || 'Verification email sent successfully!')
    } catch (error) {
      setMessage(error.message || 'Failed to resend verification email.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-gradient"></div>
      </div>

      <div className="auth-content">
        <div className="auth-card">
          <div className="auth-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', marginBottom: '1rem' }}>
              <Logo size="medium" />
              <ThemeToggle />
            </div>

            {status === 'verifying' && (
              <>
                <h2>Verifying Your Email</h2>
                <p>Please wait while we verify your email address...</p>
              </>
            )}

            {status === 'success' && (
              <>
                <h2>Email Verified! 🎉</h2>
                <p>Your account has been successfully verified</p>
              </>
            )}

            {status === 'error' && (
              <>
                <h2>Verification Failed</h2>
                <p>There was an issue verifying your email</p>
              </>
            )}

            {status === 'pending' && (
              <>
                <h2>Check Your Email</h2>
                <p>We've sent a verification link to your email address</p>
              </>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            {status === 'verifying' && (
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⏳</div>
            )}

            {status === 'success' && (
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            )}

            {status === 'error' && (
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❌</div>
            )}

            {status === 'pending' && (
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📧</div>
            )}

            {message && (
              <div className={`message ${status === 'error' ? 'error-message' : 'success-message'}`}
                   style={{
                     padding: '1rem',
                     marginBottom: '2rem',
                     borderRadius: '8px',
                     background: status === 'error' ? '#fee2e2' : '#d1fae5',
                     color: status === 'error' ? '#dc2626' : '#059669'
                   }}>
                {message}
              </div>
            )}

            {status === 'pending' && !email && (
              <div style={{ marginBottom: '2rem' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Please check your inbox and click on the verification link to activate your account.
                </p>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <button
                  onClick={handleResendEmail}
                  disabled={submitting || !email}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  {submitting ? 'Sending...' : 'Resend Verification Email'}
                </button>
              </div>
            )}

            {status === 'error' && (
              <div style={{ marginBottom: '2rem' }}>
                <button
                  onClick={handleResendEmail}
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: '100%', marginBottom: '1rem' }}
                >
                  {submitting ? 'Sending...' : 'Resend Verification Email'}
                </button>
              </div>
            )}
          </div>

          <div className="auth-footer">
            {status === 'pending' && (
              <p>Didn't receive the email? <button
                onClick={handleResendEmail}
                disabled={submitting}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  textDecoration: 'underline',
                  cursor: submitting ? 'not-allowed' : 'pointer'
                }}
              >
                Resend
              </button></p>
            )}

            <p style={{ marginTop: '1rem' }}>
              <Link to="/login">Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

