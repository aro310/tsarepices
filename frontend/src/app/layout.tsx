import type { Metadata } from 'next';
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import SiteAtmosphere from '@/components/ui/SiteAtmosphere';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { I18nProvider } from '@/lib/i18n';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Ts'Art Épices — Vanille Bourbon de Madagascar",
  description: "Découvrez la vanille Bourbon d'exception de Madagascar, cultivée au cœur de la région SAVA. Gousses 100% naturelles, récolte sélective, qualité premium.",
  keywords: ['vanille', 'Madagascar', 'Bourbon', 'gousses', 'SAVA', 'Ts Art Epices', 'épices', 'naturelle'],
  openGraph: {
    title: "Ts'Art Épices",
    description: 'Vanille Bourbon de Madagascar — 100% Naturelle',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-dark-900 text-cream-100 font-body">
        <I18nProvider>
          <SiteAtmosphere>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          </SiteAtmosphere>
        </I18nProvider>
      </body>
    </html>
  );
}
