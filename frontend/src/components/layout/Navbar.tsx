'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import CartLink from '@/components/products/CartLink';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav_home') },
    { href: '/vanille', label: t('nav_vanille') },
    { href: '/notre-histoire', label: t('nav_histoire') },
    { href: '/qualite', label: t('nav_qualite') },
    { href: '/faq', label: t('nav_faq') },
    { href: '/contact', label: t('nav_contact') },
  ];

  return (
    <nav
      className={`modern-nav fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-900/95 backdrop-blur-md shadow-lg shadow-dark-950/50 border-b border-vanilla-400/10'
          : 'bg-dark-900/65 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Ts'Art Épices — Accueil">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/images/logo-vanilla.jpg"
                alt="Ts'Art Épices — gousse de vanille"
                fill
                className="object-cover rounded-full ring-1 ring-vanilla-400/30 group-hover:ring-vanilla-400/60 transition-all duration-300"
                sizes="40px"
              />
            </div>
            <span className="font-brand text-xl md:text-2xl text-vanilla-400 group-hover:text-vanilla-300 transition-colors leading-tight">
              Ts&apos;Art <span className="text-cream-200">Épices</span>
            </span>
          </Link>

          {/* Desktop nav + language switcher */}
          <div className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                className="nav-link text-cream-300 hover:text-vanilla-400 transition-colors text-sm font-medium tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <CartLink />
          </div>

          {/* Mobile: switcher + burger */}
          <div className="mobile-nav-actions lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <CartLink />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cream-100 p-2"
              aria-label="Menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            id="mobile-navigation"
            className="lg:hidden bg-dark-900/98 backdrop-blur-lg border-t border-vanilla-400/10"
          >
            <div className="px-4 py-6 space-y-4">
              <div className="min-[481px]:hidden"><LanguageSwitcher /></div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-cream-300 hover:text-vanilla-400 transition-colors text-lg py-2 border-b border-dark-500/50"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
