# Development Setup Guide

## 🛠️ Prerequisites

Before starting, ensure you have:

### Required
- **Node.js**: v18 or higher ([Download](https://nodejs.org/))
- **npm**: v9 or higher (comes with Node.js)
- **Git**: v2.30+ ([Download](https://git-scm.com/))
- **Code Editor**: VS Code ([Download](https://code.visualstudio.com/))

### Verify Installation
```bash
node --version      # Should be v18+
npm --version       # Should be v9+
git --version       # Should be v2.30+
```

---

## 📦 Project Setup

### Step 1: Clone or Extract Project
```bash
# If using GitHub
git clone https://github.com/your-username/interactive-wall-calendar.git
cd interactive-wall-calendar

# Or navigate to your local folder
cd path/to/interactive-wall-calendar
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- React & React DOM
- Next.js
- Tailwind CSS
- TypeScript
- Lucide React icons

### Step 3: Verify Installation
```bash
# Check if dependencies are installed
npm list
```

---

## 🚀 Running the Development Server

### Start Development Server
```bash
npm run dev
```

This will:
- Start server on `http://localhost:3000`
- Enable Fast Refresh (hot reloading)
- Show TypeScript errors in terminal
- Compile assets on-the-fly

### Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

You should see the interactive calendar!

### Stop the Server
Press `Ctrl+C` in the terminal

---

## 📝 Available npm Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Run production build locally
npm run lint     # Run ESLint checks
```

---

## 🔧 Development Workflow

### 1. Making Changes
Edit files in `src/` folder:
- `src/components/InteractiveCalendar.tsx` - Main calendar component
- `src/app/page.tsx` - Home page
- `src/globals.css` - Styles
- `tailwind.config.ts` - Tailwind configuration

### 2. Hot Reload
Changes automatically show in browser (usually within 1 second)

### 3. Check for Errors
```bash
npm run lint    # Shows linting errors
```

### 4. Type Checking
VS Code shows TypeScript errors automatically. Hover over red squiggles for details.

---

## 🎨 Customization

### Change Color Scheme
Edit `tailwind.config.ts`:
```typescript
extend: {
  colors: {
    primary: '#1234FF',      // Change primary color
    secondary: '#00FF00',    // Change secondary
    accent: '#FF1234',       // Change accent
  },
}
```

### Add New Month Gradients
Edit `InteractiveCalendar.tsx`:
```typescript
const bgGradients = [
  'from-red-400 to-red-600',     // Add new gradient
  // ... more gradients
];
```

### Modify Responsive Breakpoints
Edit `InteractiveCalendar.tsx` or `tailwind.config.ts`:
```typescript
// Current breakpoints:
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
```

---

## 🐛 Debugging

### In VS Code
1. Press `Ctrl+Shift+D` (or click Debug icon)
2. Click "JavaScript Debug Terminal"
3. Run `npm run dev`
4. Set breakpoints by clicking line numbers

### Browser DevTools
1. Press `F12` to open DevTools
2. **Console Tab**: Check for JavaScript errors
3. **Elements Tab**: Inspect HTML/CSS
4. **Application Tab**: View localStorage
5. **Network Tab**: Check API calls (none in this project)

### Inspect localStorage
```javascript
// In browser console (F12)
localStorage.getItem('calendar-notes-2024-3')
localStorage.getItem('calendar-range-2024-3')
localStorage.clear()  // Clear all data
```

### React Developer Tools
1. Install [React DevTools Extension](https://chrome.google.com/webstore/detail/react-developer-tools/)
2. Open DevTools (F12)
3. Click "React Components" tab
4. Inspect component state and props

---

## 📂 File Structure Overview

```
interactive-wall-calendar/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, metadata
│   │   ├── page.tsx                # Home page (simple)
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   └── InteractiveCalendar.tsx # Main component (450 lines)
│   └── globals.css                 # Tailwind imports
├── public/                          # Static files
├── package.json                     # Dependencies list
├── tailwind.config.ts              # Tailwind theme config
├── tsconfig.json                   # TypeScript config
├── next.config.ts                  # Next.js config
├── postcss.config.js               # PostCSS config
├── .eslintrc.json                  # ESLint rules
├── .gitignore                      # Git ignore rules
├── README.md                       # Project overview
├── FEATURES.md                     # Feature documentation
└── DEPLOYMENT.md                   # Deployment guide
```

---

## 🔍 Code Quality

### Run Linter
```bash
npm run lint
```

Fixes formatting issues:
```bash
npm run lint -- --fix
```

### Check TypeScript
```bash
npm run build
# Shows type errors
```

---

## 📚 Development Tips

### 1. Quick Component Testing
Add test code in `InteractiveCalendar.tsx`:
```tsx
console.log('Component mounted');
console.log('Current date:', currentDate);
console.log('Date range:', dateRange);
```

View in browser console (F12).

### 2. State Inspection
Add React DevTools and check:
- `currentDate` state
- `dateRange` state
- `notes` state
- `theme` state

### 3. LocalStorage Testing
```javascript
// In browser console
JSON.parse(localStorage.getItem('calendar-notes-2024-3'))
// See what's stored
```

### 4. Responsive Testing
- Drag browser edge to test responsive
- Or press `F12` → click device toggle icon
- Test on iPhone SE, iPad, Galaxy S22

### 5. Performance Testing
- Open DevTools → Lighthouse
- Run performance audit
- Check for optimization opportunities

---

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `npm: command not found` | Install Node.js from nodejs.org |
| Port 3000 already in use | `npm run dev -- -p 3001` |
| Styles not loading | Clear `.next` folder: `rm -rf .next` |
| Cannot find module 'react' | Run `npm install` |
| TypeScript errors | Check red squiggles, hover for details |
| localStorage not working | Using private/incognito mode? |

---

## 📖 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## ✅ Development Checklist

Before pushing code:
- [ ] No console errors (F12)
- [ ] No TypeScript errors (npm run lint)
- [ ] Responsive on mobile (F12 device toggle)
- [ ] localStorage working (DevTools Application tab)
- [ ] All features functional
- [ ] Dark mode works
- [ ] Export functionality works

---

## 🤝 Contributing Code

When making changes:

1. **Create a feature branch**
```bash
git checkout -b feature/my-feature
```

2. **Make your changes**
```bash
# Edit files...
```

3. **Test locally**
```bash
npm run dev
# Test in browser
```

4. **Commit changes**
```bash
git add .
git commit -m "Add my feature description"
```

5. **Push to GitHub**
```bash
git push origin feature/my-feature
```

6. **Create Pull Request**
- On GitHub.com, click "Compare & pull request"
- Add description
- Submit PR

---

## 🔐 Environment Variables

Create `.env.local` for local development (optional):

```env
# Feature toggles
NEXT_PUBLIC_ENABLE_EXPORT=true
NEXT_PUBLIC_ENABLE_THEME_TOGGLE=true
NEXT_PUBLIC_VERSION=1.0.0
```

Note: These variables are public (prefixed with `NEXT_PUBLIC_`), so they appear in browser.

---

## 🎯 Next Steps

1. Run `npm install`
2. Run `npm run dev`
3. Open `http://localhost:3000`
4. Testing the calendar
5. Explore the code
6. Make your first change
7. Deploy to Vercel

---

**Happy coding! 🚀**

For issues or questions, check the README.md or FEATURES.md files.
