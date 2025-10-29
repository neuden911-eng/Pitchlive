import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('pitchlive-theme')
    if (savedTheme) {
      return savedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('pitchlive-theme', theme)
    
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      // Update favicon for dark theme
      const favicon = document.querySelector("link[rel='icon']")
      if (favicon) {
        favicon.href = '/favicon-dark.svg'
      }
    } else {
      document.documentElement.classList.remove('dark')
      // Update favicon for light theme
      const favicon = document.querySelector("link[rel='icon']")
      if (favicon) {
        favicon.href = '/favicon.svg'
      }
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

