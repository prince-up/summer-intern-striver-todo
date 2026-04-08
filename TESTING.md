# Testing Guide & Quality Assurance

## 🧪 Testing Checklist

### Core Functionality Tests

#### ✅ Calendar Display
- [ ] Current month displays correctly
- [ ] All dates (1-31) show appropriately
- [ ] Day names (MON-SUN) are correct
- [ ] Previous/next month dates grayed out
- [ ] Month/year header shows correct value

#### ✅ Date Range Selection
- [ ] First click sets start date (blue)
- [ ] Second click sets end date (blue)
- [ ] Dates between range highlight (light blue)
- [ ] Clicking again resets selection
- [ ] Selection persists when navigating
- [ ] Days count shows correctly (e.g., "15 days selected")

#### ✅ Notes Functionality
- [ ] Can type in notes textarea
- [ ] Text saves to localStorage
- [ ] Notes persist after page reload
- [ ] Notes persist when changing months
- [ ] Clear button removes all notes
- [ ] Export downloads JSON file correctly

#### ✅ Month Navigation
- [ ] "←" button goes to previous month
- [ ] "→" button goes to next month
- [ ] "Today" button jumps to current date
- [ ] Wraps correctly (Dec→Jan)
- [ ] Date range resets appropriately

#### ✅ Visual Indicators
- [ ] Today's date shows orange ring
- [ ] Selected dates are bright blue
- [ ] In-range dates are light blue
- [ ] Hover states work on dates
- [ ] Disabled dates (not current month) are grayed

#### ✅ Dark Mode
- [ ] Toggle button appears (sun/moon icon)
- [ ] Light mode has white background
- [ ] Dark mode has gray background
- [ ] Text contrast is good in both modes
- [ ] All colors are visible in both themes

#### ✅ localStorage
- [ ] Data saves to correct keys
- [ ] Key format: `calendar-notes-YYYY-M`
- [ ] Key format: `calendar-range-YYYY-M`
- [ ] Data survives page reload
- [ ] Clear button deletes localStorage
- [ ] Multiple months can store data separately

---

## 📱 Responsive Design Tests

### Mobile (320px - 640px)
- [ ] Layout stacks vertically
- [ ] Calendar grid fits on screen
- [ ] Notes textarea is usable
- [ ] Buttons are tap-friendly
- [ ] Text is readable (no zoom needed)
- [ ] No horizontal scrolling
- [ ] Images scale appropriately

### Tablet (641px - 1024px)
- [ ] Layout transitions smoothly
- [ ] Calendar and notes side-by-side or stacked
- [ ] Touch interactions work
- [ ] Text sizes are appropriate
- [ ] No spacing issues

### Desktop (1025px+)
- [ ] Hero image (left) has good proportion
- [ ] Calendar (right) has proper spacing
- [ ] Notes section is readable
- [ ] All features easily accessible
- [ ] Layout looks professional

### Devices to Test
- [ ] iPhone SE (375px)
- [ ] iPhone 14 Pro (430px)
- [ ] iPad (768px)
- [ ] MacBook (1440px)
- [ ] 4K Monitor (2560px)

---

## 🌐 Browser Compatibility

### Desktop Browsers
- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+

### Mobile Browsers
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Firefox Mobile
- [ ] Samsung Internet

### Features to Test Per Browser
- [ ] localStorage works
- [ ] CSS Grid displays correctly
- [ ] Gradients render properly
- [ ] Animations are smooth
- [ ] Transitions work
- [ ] Hover states work (desktop)
- [ ] Touch states work (mobile)

---

## ⚡ Performance Tests

### Metrics to Check (Using Lighthouse in DevTools)

```
Target: 90+ score

Performance Score
├─ First Contentful Paint (FCP): <1.5s
├─ Largest Contentful Paint (LCP): <2.5s
├─ Cumulative Layout Shift (CLS): <0.1
└─ Time to Interactive (TTI): <2.5s
```

### Test Steps
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Click "Generate report"
4. Analyze results
5. Check mobile and desktop

### Optimization Areas
- [ ] Bundle size < 50KB
- [ ] CSS < 20KB
- [ ] JavaScript < 30KB
- [ ] Total FCP < 1 second

---

## ♿ Accessibility Tests

### Keyboard Navigation
- [ ] Tab through all buttons
- [ ] Enter key activates buttons
- [ ] Arrow keys could navigate dates (future)
- [ ] Can focus on textarea input
- [ ] Can tab to all interactive elements
- [ ] No keyboard traps

### Screen Reader Testing
- [ ] Headings are semantic (h1, h2, h3)
- [ ] Buttons have descriptive labels
- [ ] Images have alt text
- [ ] Form inputs have labels
- [ ] ARIA labels where needed
- [ ] Logical reading order

### Color & Contrast
- [ ] Text passes WCAG AA (4.5:1 ratio)
- [ ] Text passes WCAG AAA (7:1 ratio)
- [ ] No color-only information
- [ ] Works in high contrast mode
- [ ] Visible focus indicators

### Test with Tools
- [ ] Chrome DevTools Lighthouse
- [ ] WAVE (Wave.webaim.org)
- [ ] Axe DevTools
- [ ] Screen readers (NVDA, JAWS, VoiceOver)

---

## 🎬 Manual Testing Workflow

### Test Session 1: Basic Functionality (15 min)
1. Open http://localhost:3000
2. Verify header and layout
3. Click few dates (should select range)
4. Type notes
5. Type notes
6. Navigate months
7. Check data persists on reload

### Test Session 2: Edge Cases (15 min)
1. Select range in one month, navigate to another
2. Clear data, check if cleared
3. Export data, check JSON format
4. Try range with leap year dates
5. Check boundary dates (1st and last of month)

### Test Session 3: Responsive (10 min)
1. Open DevTools (F12)
2. Toggle device toolbar
3. Test on: iPhone SE, iPad, Desktop
4. Test landscape and portrait
5. Verify all interactions work

### Test Session 4: Browser Testing (10 min)
1. Test in Chrome
2. Test in Firefox
3. Test in Safari
4. Check localStorage working
5. Check styling consistent

---

## 🔄 Automated Tests (To Implement)

### Example Unit Tests
```typescript
// Example: test date calculation
describe('getDaysInMonth', () => {
  it('should return 31 for March', () => {
    const date = new Date(2024, 2, 1);
    expect(getDaysInMonth(date)).toBe(31);
  });
});

// Example: test range detection
describe('isDateInRange', () => {
  it('should detect dates within range', () => {
    const start = new Date(2024, 2, 10);
    const end = new Date(2024, 2, 15);
    const testDate = new Date(2024, 2, 12);
    expect(isDateInRange(testDate, start, end)).toBe(true);
  });
});
```

### Example Integration Tests
```typescript
// Test user flows
describe('User Flow: Select Dates', () => {
  it('should save selected range', () => {
    render(<InteractiveCalendar />);
    fireEvent.click(screen.getByText('10'));
    fireEvent.click(screen.getByText('15'));
    expect(localStorage.getItem('calendar-range-...')).toBeDefined();
  });
});
```

---

## 🐛 Debugging Tips

### Use Browser DevTools

**Console Tab:**
```javascript
// Check localStorage
localStorage.getItem('calendar-notes-2024-3')

// Clear all data
localStorage.clear()

// Get all keys
Object.keys(localStorage)
```

**Elements Tab:**
- Inspect HTML structure
- Check CSS classes applied
- Verify Tailwind classes rendering
- Check computed styles

**Application Tab:**
- View localStorage keys
- Edit values directly
- Monitor storage changes
- Export/Import data

**React DevTools:**
- Inspect component state
- Check props
- Trace re-renders
- Check hooks

### Common Issues & Debugging

#### Issue: Dates not highlighting correctly
```javascript
// Check date values
console.log('Start:', dateRange.start);
console.log('End:', dateRange.end);
console.log('Current:', new Date());
```

#### Issue: Notes not saving
```javascript
// Check localStorage
console.log(localStorage.getItem('calendar-notes-2024-3'));
// Should not be null
```

#### Issue: Responsive not working
- Check Tailwind config for breakpoints
- Inspect element in mobile view (F12)
- Verify grid classes: `grid-cols-1 lg:grid-cols-3`

---

## ✅ Pre-Deployment Checklist

Before going to production:

- [ ] All tests passing
- [ ] No console errors (F12)
- [ ] Lighthouse score > 90
- [ ] Tested on 3+ browsers
- [ ] Tested on 3+ devices
- [ ] localStorage working
- [ ] Export feature working
- [ ] Dark mode working
- [ ] No TypeScript errors (`npm run lint`)
- [ ] README updated
- [ ] Code commented where needed
- [ ] Performance optimized
- [ ] Accessibility tested
- [ ] Mobile viewport meta tag present

---

## 📊 Testing Coverage Target

```
Statements: > 80%
Branches: > 75%
Functions: > 80%
Lines: > 80%
```

---

## 🔗 Testing Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Tool](https://wave.webaim.org/)

---

**Happy testing! 🚀**
