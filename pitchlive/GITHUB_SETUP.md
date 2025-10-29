# How to Push Your Code to GitHub

## Step-by-Step Guide

### Prerequisites
- Git installed on your computer ([Download Git](https://git-scm.com/downloads))
- GitHub account ([Sign up](https://github.com/join))

### Method 1: Using Command Line (Recommended)

#### Step 1: Initialize Git Repository
Open your terminal/PowerShell in the project folder and run:

```bash
git init
```

#### Step 2: Add All Files
```bash
git add .
```

#### Step 3: Make Your First Commit
```bash
git commit -m "Initial commit: Converted HTML to React + Vite project"
```

#### Step 4: Create a New Repository on GitHub
1. Go to [github.com](https://github.com)
2. Click the **"+"** icon in the top right
3. Select **"New repository"**
4. Fill in:
   - **Repository name**: `pitchlive` (or your preferred name)
   - **Description**: "PitchLive - Pitch in Person. Fund in Minutes."
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

#### Step 5: Connect Your Local Repository to GitHub
GitHub will show you commands. Copy and run these commands (replace `YOUR_USERNAME` with your GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/pitchlive.git
git branch -M main
git push -u origin main
```

**Example:**
If your GitHub username is `johnsmith`, you would run:
```bash
git remote add origin https://github.com/johnsmith/pitchlive.git
git branch -M main
git push -u origin main
```

#### Step 6: Enter Your Credentials
- You'll be prompted for username and password
- For password, use a **Personal Access Token** (not your GitHub password)
- To create a token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token

---

### Method 2: Using GitHub Desktop (Easier for Beginners)

1. **Download GitHub Desktop**: [desktop.github.com](https://desktop.github.com/)

2. **Open GitHub Desktop**:
   - File → Add Local Repository
   - Browse to your `PitchLive` folder
   - Click "Add repository"

3. **Commit your changes**:
   - Summary: "Initial commit: Converted HTML to React + Vite project"
   - Click "Commit to main"

4. **Publish to GitHub**:
   - Click "Publish repository"
   - Choose a name (e.g., `pitchlive`)
   - Choose Public or Private
   - Click "Publish repository"

---

### Quick Command Reference

```bash
# Navigate to your project folder
cd C:\Users\ajite\Desktop\PitchLive

# Initialize git (only needed once)
git init

# Add all files
git add .

# Commit changes
git commit -m "Your commit message"

# Add remote repository (replace with your GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git push -u origin main
```

---

### Future Updates

After making changes to your code:

```bash
# Stage changes
git add .

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub
git push
```

---

### Troubleshooting

**If you get "remote origin already exists":**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

**If you need to update your git config:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**If you see authentication errors:**
- Use a Personal Access Token instead of password
- Or use SSH keys for authentication

---

### Connect to Vercel After GitHub Setup

Once your code is on GitHub:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-deploy on every push!

---

## Need Help?

- Git documentation: https://git-scm.com/doc
- GitHub guides: https://guides.github.com
- Vercel + GitHub: https://vercel.com/docs/concepts/git


