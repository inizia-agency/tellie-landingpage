import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tellie | Private stakeholder portal',
  description: 'A private overview of Tellie, its product, market, pilot opportunities and long-term vision.',
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
