# PitchLive - Pitch in Person. Fund in Minutes.

A modern React + Vite application connecting startup founders with investors through one-on-one pitching sessions.

## 🚀 Features

- **Premium UI/UX**: Beautiful, modern design with smooth animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **React Components**: Modular component architecture
- **Vite Build**: Fast development and optimized production builds
- **Vercel Ready**: Configured for seamless deployment on Vercel

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 🚢 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect the Vite configuration
5. Click "Deploy"

### Option 3: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click "Deploy"

## 📁 Project Structure

```
PitchLive/
├── src/
│   ├── components/     # React components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Stats.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Features.jsx
│   │   ├── UserTypes.jsx
│   │   ├── Technology.jsx
│   │   ├── CTA.jsx
│   │   └── Footer.jsx
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── vercel.json          # Vercel deployment config
└── package.json         # Dependencies
```

## 🛠️ Tech Stack

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **CSS3**: Custom styling with CSS variables
- **Google Fonts**: Inter & Playfair Display

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 Environment Variables

No environment variables required for basic setup.

## 📄 License

MIT License

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


