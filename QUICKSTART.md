# 🚀 Quick Start Guide (5 Minutes)

## ⚡ Get Running in 5 Minutes

### 1️⃣ Install Dependencies (2 min)
```bash
npm install
```

### 2️⃣ Start Development Server (1 min)
```bash
npm run dev
```

### 3️⃣ Open in Browser (1 min)
```
http://localhost:3000
```

### 4️⃣ Test the Features (1 min)
- ✅ Click on dates to select range
- ✅ Type in notes area
- ✅ Toggle dark mode
- ✅ Navigate months
- ✅ Export data

**You're all set! 🎉**

---

## 📚 Documentation Structure

After setup, check these files:

| File | Purpose | Read Time |
|------|---------|-----------|
| **README.md** | Project overview & features | 5 min |
| **FEATURES.md** | Detailed feature documentation | 10 min |
| **DEVELOPMENT.md** | Setup & development workflow | 15 min |
| **DEPLOYMENT.md** | How to deploy to production | 10 min |
| **ARCHITECTURE.md** | Technical design & data flow | 15 min |

---

## 🎯 Key Shortcuts

| Action | Result |
|--------|--------|
| Click date | Start selection |
| Click another date | Complete range |
| Type in notes | Auto-saves |
| Click moon 🌙 | Toggle dark mode |
| ← / → buttons | Change month |
| "Today" button | Jump to current date |
| Download icon | Export as JSON |
| Trash icon | Clear notes |

---

## 🔧 Common Commands

```bash
npm run dev        # Start development
npm run build      # Build for production
npm run start      # Run production build
npm run lint       # Check code quality
Ctrl+C            # Stop server
```

---

## 📁 Edit These Files

Main component to customize:
```
src/components/InteractiveCalendar.tsx
```

Styling:
```
src/globals.css
tailwind.config.ts
```

Configuration:
```
next.config.ts
tsconfig.json
```

---

## 🚀 Deploy in 3 Steps

### Option 1: Vercel (Recommended)
```bash
git push  # Push to GitHub
→ Visit vercel.com
→ Connect repo
→ Auto-deployed! 🎉
```

### Option 2: Netlify
```bash
npm run build
→ Drag `.next` folder to Netlify
→ Done! 🎉
```

### Option 3: GitHub Pages
- See DEPLOYMENT.md for details

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm install` fails | Delete `node_modules`, try again |
| Port 3000 in use | `npm run dev -- -p 3001` |
| Styles broken | `rm -rf .next`, restart server |
| Data not saving | Check localStorage in DevTools |
| Slow performance | Clear browser cache |

---

## 📖 Next Steps

1. ✅ Run the project
2. ✅ Explore the code
3. ✅ Read FEATURES.md
4. ✅ Make customizations
5. ✅ Deploy to Vercel
6. ✅ Share with friends! 🎉

---

## 💡 Pro Tips

- Use **Dark Mode** for evening use
- **Export** your calendar regularly
- **Clear Selection** before starting new range
- Check **browser console** (F12) for debugging
- Use **Lighthouse** in DevTools to check performance

---

**Questions?** Check the README.md or other documentation files!

**Happy coding! 🚀**
