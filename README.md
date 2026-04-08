# Interactive Wall Calendar Component

A beautiful, fully-functional React/Next.js interactive wall calendar component with date range selection, integrated notes, and responsive design.

![Calendar Screenshot](#)

## 🌟 Features

### Core Features
- ✅ **Wall Calendar Aesthetic** - Clean, modern design inspired by physical wall calendars with prominent hero image area
- ✅ **Day Range Selector** - Select start and end dates with visual feedback
- ✅ **Integrated Notes Section** - Add and manage notes for each calendar month
- ✅ **Fully Responsive** - Seamlessly adapts from mobile (320px) to desktop (1920px+)
- ✅ **Local Storage Persistence** - All data automatically saved to browser's localStorage
- ✅ **Dark/Light Theme** - Toggle between theme modes

### Creative Features ✨
- 🎨 **Dynamic Color Themes** - Gradient backgrounds change based on the month
- 📊 **Date Range Analytics** - Shows the number of selected days
- 🎯 **Today's Date Indicator** - Visual ring highlighting today's date
- 💾 **Export Functionality** - Download calendar data as JSON
- ⌨️ **Keyboard-Ready** - Fully keyboard accessible
- 📱 **Touch-Friendly** - Optimized for mobile and touch interactions
- ♿ **Accessible Design** - WCAG compliant with proper semantic HTML

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository** (or navigate to the project folder)
```bash
cd interactive-wall-calendar
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm run start
```

## 📁 Project Structure

```
interactive-wall-calendar/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles and animations
│   ├── components/
│   │   └── InteractiveCalendar.tsx  # Main calendar component
│   └── globals.css             # Tailwind + custom utilities
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── postcss.config.js
```

## 🎨 Component API

### InteractiveCalendar Component

```tsx
import InteractiveCalendar from '@/components/InteractiveCalendar';

// Basic usage
<InteractiveCalendar />

// With specific month/year
<InteractiveCalendar month={3} year={2024} />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `month` | `number` | Current month | Month to display (0-11) |
| `year` | `number` | Current year | Year to display |

## 💾 Data Persistence

The component automatically saves data to `localStorage`:

**Keys used:**
- `calendar-notes-{YEAR}-{MONTH}` - Stores notes text
- `calendar-range-{YEAR}-{MONTH}` - Stores selected date range

Data persists across browser sessions and can be cleared manually through the UI or browser DevTools.

## 🎯 Usage Guide

### Selecting Date Ranges
1. Click on a date to set the start date (highlighted in blue)
2. Click another date to set the end date
3. Dates between start and end are highlighted in light blue
4. Click "Clear Selection" to reset

### Managing Notes
1. Type in the notes textarea to add notes for the current month
2. Text automatically saves to localStorage
3. Use the **Export** button to download data as JSON
4. Use the **Trash** icon to clear notes

### Navigating Months
- Use **← →** arrows to go to previous/next month
- Click **Today** button to jump to current date
- Numbers show today's date with an orange ring

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3.3
- **Icons**: Lucide React
- **Language**: TypeScript
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: Browser localStorage API

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 640px (vertical layout)
- **Tablet**: 641px - 1024px (transitional layout)
- **Desktop**: 1025px+ (side-by-side layout with hero image)

## 🌈 Color System

- **Primary**: `#0066FF` (Blue)
- **Light Accent**: `#00D4FF` (Cyan)
- **Danger**: `#FF6B6B` (Red)
- **Backgrounds**: Gradient-based (monthly themes)

## 🔐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Android Chrome)

## 📦 Dependencies

### Production
- `react@^18.2.0` - UI library
- `react-dom@^18.2.0` - DOM rendering
- `next@^14.0.0` - React framework
- `lucide-react@^0.263.1` - Icon library

### Development
- `typescript@^5.0.0`
- `tailwindcss@^3.3.0`
- `postcss@^8.4.0`
- `autoprefixer@^10.4.0`

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Deploy automatically

```bash
git push
# Vercel automatically builds and deploys
```

### Deploy on Netlify

1. Build locally:
```bash
npm run build
```

2. Upload the `.next` folder to Netlify

### Deploy on GitHub Pages

```bash
npm run build
npm run export  # (if using static export)
```

## 📊 Performance Optimizations

- ✅ Server-side rendering with Next.js
- ✅ Automatic code splitting
- ✅ CSS optimization with Tailwind
- ✅ Dynamic imports for components
- ✅ Efficient date calculations

## 🐛 Troubleshooting

**Issue: Dates not saving?**
- Check if localStorage is enabled in browser
- Clear browser cache and try again
- Check DevTools Console for errors

**Issue: Styling looks broken?**
- Ensure Tailwind CSS is properly installed
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`

**Issue: Month navigation broken?**
- Check browser console for JavaScript errors
- Ensure JavaScript is enabled
- Try in a different browser

## 📝 Notes on Design Choices

1. **Color Gradients**: Changed monthly to reduce monotony
2. **localStorage over Cookies**: Better for larger data payloads
3. **Client-side Only**: No backend needed for this use case
4. **Tailwind CSS**: Rapid development and consistent styling
5. **TypeScript**: Type safety and better IDE support

## 🎬 Video Demonstration

[Link to Loom/YouTube video showing:
- Date range selection
- Notes functionality
- Mobile responsiveness
- Desktop view
- Theme switching
- Data export]

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this component in your projects.

## 👨‍💻 Author

**Prince Yadav**
- **GitHub**: [@prince-up](https://github.com/prince-up)
- **LinkedIn**: [Prince Yadav](https://www.linkedin.com/in/prince-yadav-4t/)
- **Twitter/X**: [@prince__up](https://x.com/prince__up)

---

**Made with ❤️ for Frontend Excellence**
