import { useState, useEffect, useContext, createContext } from 'react'
import authService from '../services/authService.js'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    try {
      await authService.initialize()

      if (authService.isAuthenticated() && authService.isTokenValid()) {
        try {
          await authService.refreshTokenIfNeeded()
          setUser(authService.getUser())
        } catch (error) {
          console.error('Failed to refresh token:', error)
          authService.clearAuthData()
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error)
      authService.clearAuthData()
    } finally {
      setLoading(false)
      setInitialized(true)
    }
  }

  const login = async (email, password, userType) => {
    setLoading(true)
    try {
      const result = await authService.login(email, password, userType)
      setUser(result.user)
      return result
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData) => {
    setLoading(true)
    try {
      const result = await authService.signup(userData)
      if (result.success && !result.requiresVerification) {
        setUser(result.user)
      }
      return result
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const verifyEmail = async (token) => {
    setLoading(true)
    try {
      const result = await authService.verifyEmail(token)
      setUser(result.user)
      return result
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const resendVerificationEmail = async (email) => {
    try {
      return await authService.resendVerificationEmail(email)
    } catch (error) {
      throw error
    }
  }

  const forgotPassword = async (email) => {
    try {
      return await authService.forgotPassword(email)
    } catch (error) {
      throw error
    }
  }

  const resetPassword = async (token, newPassword) => {
    setLoading(true)
    try {
      const result = await authService.resetPassword(token, newPassword)
      return result
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }))
  }

  const handleSocialLogin = async (provider, token) => {
    setLoading(true)
    try {
      const result = await authService.handleSocialLogin(provider, token)
      setUser(result.user)
      return result
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const refreshUser = async () => {
    if (authService.isAuthenticated()) {
      try {
        const userData = await authService.getCurrentUser()
        setUser(userData)
        return userData
      } catch (error) {
        console.error('Failed to refresh user data:', error)
        logout()
      }
    }
    return null
  }

  const value = {
    user,
    loading,
    initialized,
    isAuthenticated: authService.isAuthenticated(),
    userType: authService.getUserType(),
    login,
    signup,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword,
    logout,
    updateUser,
    handleSocialLogin,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}