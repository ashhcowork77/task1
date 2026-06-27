import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { PageTransition } from '@/components/PageTransition';
import { SiteHeader } from '@/components/SiteHeader';
import '../globals.css';

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: 'Not Just A Stay - Luxury Villa Stays in North Goa',
  description: 'Discover our handpicked collection of luxury villas in North Goa. Private pools, stunning locations, and unforgettable experiences await you.',
  openGraph: {
    title: 'Not Just A Stay - Luxury Villa Stays in North Goa',
    description: 'Discover our handpicked collection of luxury villas in North Goa.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lato.variable}>
      <body className="min-h-screen bg-[#F8F8F8] font-lato text-[#141414] antialiased">
        <SiteHeader />
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
