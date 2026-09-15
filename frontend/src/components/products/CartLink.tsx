'use client';
import Link from 'next/link';
import { useCart } from '@/lib/useCart';
import { useI18n } from '@/lib/i18n';
export default function CartLink() {
  const { count } = useCart();
  const { lang } = useI18n();
  return <Link href="/panier" className="cart-nav-link" aria-label={`${lang === 'fr' ? 'Panier' : 'Cart'} (${count})`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 3h2l3 12h10l3-9H6M9 20h.01M18 20h.01" strokeLinecap="round" strokeLinejoin="round" /></svg>
    <span>{count}</span>
  </Link>;
}
