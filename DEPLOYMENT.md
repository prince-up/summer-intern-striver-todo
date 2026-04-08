# Deployment Guide

## Deploy on Vercel (Recommended - 5 minutes)

**Vercel is the optimal choice for Next.js applications.**

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Interactive Wall Calendar"
git branch -M main
git remote add origin https://github.com/your-username/interactive-wall-calendar.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your repository
5. Click "Deploy"

**That's it!** Your app is live in seconds.

### Environment Variables
No environment variables needed for this project (purely frontend).

---

## Deploy on Netlify (10 minutes)

### Step 1: Build the Project
```bash
npm run build
```

### Step 2: Drag & Drop Deploy
1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Drag and drop the `.next/standalone` folder
4. Deploy

### Step 3: (Recommended) Connect Repository
1. Click "Site settings"
2. Connect to GitHub
3. Enable automatic deployments

---

## Deploy on GitHub Pages (For Static Export)

### Modify next.config.ts:
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
}

export default nextConfig
```

### Build and Deploy:
```bash
npm run build
git add .
git commit -m "Deploy to GitHub Pages"
git push
```

Go to **Settings → Pages** and select `main` branch as source.

---

## Deploy with Docker

### Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Build and Run:
```bash
docker build -t calendar-app .
docker run -p 3000:3000 calendar-app
```

---

## Environment Variables (Optional)

Create a `.env.local` file:
```env
# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Feature flags
NEXT_PUBLIC_ENABLE_EXPORT=true
NEXT_PUBLIC_ENABLE_THEME_TOGGLE=true
```

---

## Performance Tips

1. **Enable Compression**: Vercel does this automatically
2. **Add CDN**: Use Cloudflare for global distribution
3. **Monitor**: Use Vercel Analytics dashboard
4. **Optimize Images**: Already done with Next.js Image component

---

## Monitoring & Logging

### Vercel Dashboard
- Visit [vercel.com/dashboard](https://vercel.com/dashboard)
- View deployment logs and analytics
- Monitor performance metrics

### Browser Storage Inspection
Users can inspect localStorage:
- Open DevTools (F12)
- Go to Application/Storage
- View `calendar-notes-*` and `calendar-range-*` keys

---

## Troubleshooting Deployment

| Issue | Solution |
|-------|----------|
| Build fails | Run `npm install` locally, check `npm run build` |
| Styles look broken | Clear cache: Settings → Clear all files → Re-deploy |
| Dark mode not working | Check if JS is enabled in browser |
| localStorage empty | Browser privacy mode or blocked storage |

---

## Cost Breakdown

| Platform | Cost | Notes |
|----------|------|-------|
| **Vercel** | Free | Generous free tier, perfect for hobby projects |
| **Netlify** | Free | Similar to Vercel |
| **GitHub Pages** | Free | Limited to static sites |
| **AWS** | $5-50/mo | Overkill for this project |

---

## Further Optimization

### Add Analytics
```tsx
// In src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Add Sentry Error Tracking
```bash
npm install @sentry/nextjs
```

### Add PWA Support
```bash
npm install next-pwa
```

---

## Security Best Practices

✅ Content Security Policy (CSP)
✅ HTTPS enforced
✅ XSS protection included with Next.js
✅ No sensitive data stored
✅ Use CORS if needed

---

## Custom Domain

**For Vercel:**
1. Settings → Domains
2. Add your domain
3. Update DNS records
4. Wait 24-48 hours

**Popular domain providers:**
- Namecheap
- GoDaddy
- Google Domains
- Cloudflare

---

**Questions?** Check [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
