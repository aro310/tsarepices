'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/useCart';
import { useI18n } from '@/lib/i18n';

export default function AddToCartButton({ productId, quantity }: { productId: number; quantity: number }) {
  const { add } = useCart();
  const { lang } = useI18n();
  const [added, setAdded] = useState(false);
  return <div className="mt-auto w-full">
    <button type="button" className="btn-gold w-full" onClick={() => { add(productId, quantity); setAdded(true); }}>
      <span aria-hidden="true">＋</span>{lang === 'fr' ? 'Ajouter au panier' : 'Add to cart'}
    </button>
    <p role="status" className="text-sm text-vanilla-300 mt-2 min-h-6 text-center">
      {added && <Link href="/panier" className="underline underline-offset-4">{lang === 'fr' ? 'Ajouté ✓ Voir le panier' : 'Added ✓ View cart'}</Link>}
    </p>
  </div>;
}
