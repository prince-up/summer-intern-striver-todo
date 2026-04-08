import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Interactive Wall Calendar',
  description: 'A beautiful, interactive wall calendar component with date range selection and notes',
  keywords: 'calendar, interactive, react, next.js, date selection',
  authors: [{ name: 'Prince Yadav' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>📅</text></svg>" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
