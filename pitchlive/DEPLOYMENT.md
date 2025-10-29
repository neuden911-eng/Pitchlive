# Deployment Guide for Vercel

## Quick Start

### Prerequisites
- Node.js 16+ installed
- Git repository (optional, but recommended)
- Vercel account (free tier available)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Test Locally
```bash
npm run dev
```
Visit `http://localhost:5173` to preview your app.

### Step 3: Deploy to Vercel

#### Method A: Vercel CLI (Recommended)

1. Install Vercel CLI globally:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No**
   - Project name? (Press Enter for default or type custom name)
   - Directory? (Press Enter for `./`)
   - Override settings? **No**

5. Your app will be deployed! You'll get a URL like `https://your-project.vercel.app`

#### Method B: GitHub Integration (Best for Continuous Deployment)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "New Project"

4. Import your GitHub repository

5. Vercel will auto-detect Vite settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. Click "Deploy"

7. Every push to your main branch will automatically deploy!

#### Method C: Drag & Drop (Quick Testing)

1. Build your project:
```bash
npm run build
```

2. Go to [vercel.com](https://vercel.com)

3. Drag and drop the `dist` folder to the Vercel dashboard

4. Your app will be deployed instantly!

## Environment Variables

No environment variables needed for this project currently.

## Custom Domain

After deployment:
1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Troubleshooting

### Build Fails
- Make sure all dependencies are in `package.json`
- Check that Node.js version is 16+
- Run `npm install` again

### Styles Not Loading
- Ensure `index.css` is imported in `main.jsx`
- Check that CSS file paths are correct

### Navigation Not Working
- Verify smooth scroll is enabled
- Check that anchor links use `#` prefix

## Next Steps

1. Set up custom domain
2. Enable analytics in Vercel dashboard
3. Set up environment variables if needed
4. Configure deployment previews for pull requests

## Support

For issues:
- Check Vercel docs: https://vercel.com/docs
- Check Vite docs: https://vitejs.dev


