// API service configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
    this.token = localStorage.getItem('authToken')
  }

  setToken(token) {
    this.token = token
    if (token) {
      localStorage.setItem('authToken', token)
    } else {
      localStorage.removeItem('authToken')
    }
  }

  getAuthHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    return headers
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'API request failed')
      }

      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // Auth methods
  async login(credentials) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })

    if (data.token) {
      this.setToken(data.token)
    }

    return data
  }

  async signup(userData) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })

    if (data.token) {
      this.setToken(data.token)
    }

    return data
  }

  async verifyEmail(token) {
    return this.request('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    })
  }

  async resendVerificationEmail(email) {
    return this.request('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  async forgotPassword(email) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  async resetPassword(token, newPassword) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    })
  }

  async getCurrentUser() {
    return this.request('/auth/me')
  }

  // User profile methods
  async updateProfile(profileData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    })
  }

  async uploadProfilePicture(file) {
    const formData = new FormData()
    formData.append('profilePicture', file)

    return this.request('/users/profile-picture', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  }

  // Pitch methods
  async getPitches() {
    return this.request('/pitches')
  }

  async createPitch(pitchData) {
    return this.request('/pitches', {
      method: 'POST',
      body: JSON.stringify(pitchData),
    })
  }

  async updatePitch(id, pitchData) {
    return this.request(`/pitches/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pitchData),
    })
  }

  async uploadPitchDeck(pitchId, file) {
    const formData = new FormData()
    formData.append('pitchDeck', file)

    return this.request(`/pitches/${pitchId}/upload`, {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  }

  // Investor methods
  async getInvestors(filters = {}) {
    const params = new URLSearchParams(filters)
    return this.request(`/investors?${params}`)
  }

  async getInvestor(id) {
    return this.request(`/investors/${id}`)
  }

  // Meeting methods
  async getMeetings() {
    return this.request('/meetings')
  }

  async scheduleMeeting(meetingData) {
    return this.request('/meetings', {
      method: 'POST',
      body: JSON.stringify(meetingData),
    })
  }

  async updateMeeting(id, meetingData) {
    return this.request(`/meetings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(meetingData),
    })
  }

  // Document methods
  async uploadDocument(file, documentType) {
    const formData = new FormData()
    formData.append('document', file)
    formData.append('documentType', documentType)

    return this.request('/documents/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  }

  async getDocuments() {
    return this.request('/documents')
  }

  // Analytics methods
  async getFounderAnalytics() {
    return this.request('/analytics/founder')
  }

  async getInvestorAnalytics() {
    return this.request('/analytics/investor')
  }

  // Messaging methods
  async getConversations() {
    return this.request('/messages/conversations')
  }

  async getMessages(conversationId) {
    return this.request(`/messages/conversations/${conversationId}`)
  }

  async sendMessage(conversationId, message) {
    return this.request(`/messages/conversations/${conversationId}`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    })
  }
}

const apiService = new ApiService()
export default apiService