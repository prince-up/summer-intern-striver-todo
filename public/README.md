# Public Assets Directory

This directory is for static assets like images, fonts, and other files.

## What goes here?
- Hero images for the calendar
- Custom fonts
- Logos
- Icons (though we're using Lucide React)
- Favicon

## Example: Adding a Hero Image

1. Place `calendar-hero.jpg` in this directory
2. Then use in component:

```tsx
<img 
  src="/calendar-hero.jpg" 
  alt="Calendar Hero"
  className="w-full h-80 object-cover"
/>
```

## Notes
- Files are served directly by Next.js
- No build step needed
- Files are cached by browser
- Compress images for better performance (use tools like TinyPNG)
