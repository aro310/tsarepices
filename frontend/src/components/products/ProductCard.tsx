'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Product } from '@/types';
import AddToCartButton from '@/components/products/AddToCartButton';
import Badge from '@/components/ui/Badge';
import { useI18n } from '@/lib/i18n';

export default function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { t } = useI18n();

  const unitEur = product.price_eur ?? 0;
  const totalEur = unitEur * qty;

  const title = product.weight === 'tube'
    ? t('product_format_tube')
    : `${t('product_format_weight')} ${product.weight}`;

  return (
    <AnimatedSection className="h-full">
      <div className="product-card glass-card rounded-xl overflow-hidden flex flex-col h-full min-h-[520px]">

        {/* Image — click to detail */}
        <Link href={`/vanille/${product.slug}`} className="block relative h-56 flex-shrink-0 overflow-hidden group">
          <Image
            src={product.image}
            alt={`${product.name} ${product.weight}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            {product.format === 'tube' && <Badge variant="green">{t('catalog_tube')}</Badge>}
            {product.inStock && <Badge variant="gold">{t('product_in_stock')}</Badge>}
          </div>
        </Link>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <Link href={`/vanille/${product.slug}`}>
            <h3 className="font-display text-xl font-semibold text-cream-100 mb-1 leading-[1.4] hover:text-vanilla-400 transition-colors">
              {title}
            </h3>
          </Link>
          <p className="text-cream-400 text-sm mb-4 leading-[1.5]">{product.subtitle}</p>

          {/* Price — Euro only */}
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-vanilla-400 font-semibold text-xl font-display">
              {unitEur > 0 ? `${unitEur} €` : '—'}
            </span>
            <span className="text-cream-500 text-xs uppercase tracking-widest">{t('product_per_unit')}</span>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-cream-400 text-sm">{t('product_quantity')}</span>
            <div className="flex items-center gap-2">
              <button
                aria-label="Diminuer"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-8 h-8 rounded-full bg-dark-500 border border-vanilla-400/20 text-cream-100 flex items-center justify-center hover:bg-vanilla-400 hover:text-dark-900 transition-all font-bold text-lg leading-none"
              >−</button>
              <span className="text-cream-100 font-semibold text-lg w-8 text-center">{qty}</span>
              <button
                aria-label="Augmenter"
                onClick={() => setQty(Math.min(999, qty + 1))}
                className="w-8 h-8 rounded-full bg-dark-500 border border-vanilla-400/20 text-cream-100 flex items-center justify-center hover:bg-vanilla-400 hover:text-dark-900 transition-all font-bold text-lg leading-none"
              >+</button>
            </div>
          </div>

          {/* Total */}
          {qty > 1 && unitEur > 0 && (
            <div className="flex items-center justify-between mb-3 py-2 px-3 rounded-lg bg-vanilla-400/10 border border-vanilla-400/20">
              <span className="text-cream-400 text-sm">{t('product_total')}</span>
              <span className="text-vanilla-400 font-semibold text-sm">{totalEur} €</span>
            </div>
          )}

          <AddToCartButton key={product.id} productId={product.id} quantity={qty} />
        </div>
      </div>
    </AnimatedSection>
  );
}
