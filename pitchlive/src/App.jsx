import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth.js'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Verification from './pages/Verification'
import InvestorDashboard from './pages/InvestorDashboard'
import FounderDashboard from './pages/FounderDashboard'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import FeaturesPage from './pages/FeaturesPage'
import HowItWorksPage from './pages/HowItWorksPage'
import UsersPage from './pages/UsersPage'
import TechnologyPage from './pages/TechnologyPage'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/investor-dashboard" element={<InvestorDashboard />} />
          <Route path="/founder-dashboard" element={<FounderDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App


