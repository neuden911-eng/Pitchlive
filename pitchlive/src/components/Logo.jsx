import { useTheme } from '../context/ThemeContext'

export default function Logo({ size = 'medium' }) {
  const { theme } = useTheme()
  const sizes = {
    small: { width: '180px', height: '60px', fontSize: '1.75rem' },
    medium: { width: '240px', height: '80px', fontSize: '2.25rem' },
    large: { width: '320px', height: '100px', fontSize: '3rem' }
  }

  const style = sizes[size] || sizes.medium
  const isDark = theme === 'dark'
  const gradientId = `logoGradient-${size}-${isDark ? 'dark' : 'light'}`

  return (
    <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <svg 
        width={style.width} 
        height={style.height} 
        viewBox="0 0 240 70" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {isDark ? (
              <>
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#f0abfc" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="50%" stopColor="#764ba2" />
                <stop offset="100%" stopColor="#f093fb" />
              </>
            )}
          </linearGradient>
        </defs>
        
        {/* Microphone/Pitch Icon */}
        <circle cx="35" cy="35" r="28" fill={`url(#${gradientId})`} opacity={isDark ? "0.3" : "0.2"}/>
        <path 
          d="M35 18C28.9249 18 24 22.9249 24 29V33C24 39.0751 28.9249 44 35 44C41.0751 44 46 39.0751 46 33V29C46 22.9249 41.0751 18 35 18Z" 
          fill={`url(#${gradientId})`}
        />
        <path 
          d="M28 45C28 47.2091 29.7909 49 32 49H38C40.2091 49 42 47.2091 42 45H28Z" 
          fill={`url(#${gradientId})`}
        />
        <line x1="35" y1="49" x2="35" y2="58" stroke={`url(#${gradientId})`} strokeWidth="3" strokeLinecap="round"/>
        
        {/* Live Indicator Pulse */}
        <circle cx="35" cy="35" r="32" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" opacity="0.5">
          <animate attributeName="r" values="28;35;28" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite"/>
        </circle>
        
        {/* Text "PitchLive" */}
        <text 
          x="70" 
          y="45" 
          fontFamily="'Playfair Display', serif" 
          fontSize="34" 
          fontWeight="900" 
          fill={`url(#${gradientId})`}
          letterSpacing="0.5px"
        >
          PitchLive
        </text>
      </svg>
    </div>
  )
}

