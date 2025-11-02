import apiService from './api.js'

class AuthService {
  constructor() {
    this.token = null
    this.user = null
    this.initialized = false
  }

  // Initialize auth state from localStorage
  initialize() {
    if (this.initialized) return Promise.resolve()

    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')

    if (token && userData) {
      try {
        this.token = token
        this.user = JSON.parse(userData)
        apiService.setToken(token)
      } catch (error) {
        this.clearAuthData()
      }
    }

    this.initialized = true
    return Promise.resolve()
  }

  async login(email, password, userType) {
    try {
      const response = await apiService.login({
        email,
        password,
        userType,
      })

      if (response.success) {
        this.setAuthData(response.token, response.user)
        return { success: true, user: response.user }
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw new Error(error.message || 'Login failed. Please try again.')
    }
  }

  async signup(userData) {
    try {
      const response = await apiService.signup(userData)

      if (response.success) {
        // For email verification flow, don't set auth data yet
        if (response.requiresVerification) {
          return {
            success: true,
            requiresVerification: true,
            message: response.message
          }
        } else {
          this.setAuthData(response.token, response.user)
          return { success: true, user: response.user }
        }
      } else {
        throw new Error(response.message || 'Signup failed')
      }
    } catch (error) {
      console.error('Signup error:', error)
      throw new Error(error.message || 'Signup failed. Please try again.')
    }
  }

  async verifyEmail(token) {
    try {
      const response = await apiService.verifyEmail(token)

      if (response.success) {
        this.setAuthData(response.token, response.user)
        return { success: true, user: response.user }
      } else {
        throw new Error(response.message || 'Email verification failed')
      }
    } catch (error) {
      console.error('Email verification error:', error)
      throw new Error(error.message || 'Email verification failed. Please try again.')
    }
  }

  async resendVerificationEmail(email) {
    try {
      const response = await apiService.resendVerificationEmail(email)
      return response
    } catch (error) {
      console.error('Resend verification error:', error)
      throw new Error(error.message || 'Failed to resend verification email.')
    }
  }

  async forgotPassword(email) {
    try {
      const response = await apiService.forgotPassword(email)
      return response
    } catch (error) {
      console.error('Forgot password error:', error)
      throw new Error(error.message || 'Failed to send reset password email.')
    }
  }

  async resetPassword(token, newPassword) {
    try {
      const response = await apiService.resetPassword(token, newPassword)

      if (response.success) {
        return { success: true, message: response.message }
      } else {
        throw new Error(response.message || 'Password reset failed')
      }
    } catch (error) {
      console.error('Reset password error:', error)
      throw new Error(error.message || 'Password reset failed. Please try again.')
    }
  }

  async getCurrentUser() {
    try {
      if (!this.token) {
        throw new Error('No authentication token')
      }

      const response = await apiService.getCurrentUser()

      if (response.success) {
        this.user = response.user
        localStorage.setItem('userData', JSON.stringify(response.user))
        return response.user
      } else {
        throw new Error(response.message || 'Failed to get user data')
      }
    } catch (error) {
      console.error('Get current user error:', error)
      this.clearAuthData()
      throw error
    }
  }

  logout() {
    this.clearAuthData()
  }

  setAuthData(token, user) {
    this.token = token
    this.user = user

    localStorage.setItem('authToken', token)
    localStorage.setItem('userData', JSON.stringify(user))
    localStorage.setItem('userType', user.userType)
    localStorage.setItem('userName', user.name)
    localStorage.setItem('isLoggedIn', 'true')

    apiService.setToken(token)
  }

  clearAuthData() {
    this.token = null
    this.user = null

    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    localStorage.removeItem('userType')
    localStorage.removeItem('userName')
    localStorage.removeItem('isLoggedIn')

    apiService.setToken(null)
  }

  // Getters
  isAuthenticated() {
    return !!this.token && !!this.user
  }

  getToken() {
    return this.token
  }

  getUser() {
    return this.user
  }

  getUserType() {
    return this.user?.userType
  }

  // Token validation
  isTokenValid() {
    if (!this.token) return false

    try {
      // Simple JWT token parsing (for demo - in production, use proper validation)
      const payload = JSON.parse(atob(this.token.split('.')[1]))
      const currentTime = Date.now() / 1000

      return payload.exp > currentTime
    } catch (error) {
      console.error('Token validation error:', error)
      return false
    }
  }

  // Auto-refresh token if needed
  async refreshTokenIfNeeded() {
    if (!this.token) return false

    try {
      const payload = JSON.parse(atob(this.token.split('.')[1]))
      const currentTime = Date.now() / 1000
      const timeUntilExpiry = payload.exp - currentTime

      // Refresh token if it expires within 5 minutes
      if (timeUntilExpiry < 300) {
        const response = await apiService.request('/auth/refresh', {
          method: 'POST',
        })

        if (response.token) {
          this.setAuthData(response.token, response.user || this.user)
          return true
        }
      }

      return true
    } catch (error) {
      console.error('Token refresh error:', error)
      this.clearAuthData()
      return false
    }
  }

  // Social authentication methods
  async handleSocialLogin(provider, token) {
    try {
      const response = await apiService.request(`/auth/${provider}`, {
        method: 'POST',
        body: JSON.stringify({ token }),
      })

      if (response.success) {
        this.setAuthData(response.token, response.user)
        return { success: true, user: response.user }
      } else {
        throw new Error(response.message || `${provider} login failed`)
      }
    } catch (error) {
      console.error(`${provider} login error:`, error)
      throw new Error(error.message || `${provider} login failed. Please try again.`)
    }
  }
}

const authService = new AuthService()
export default authService