'use client';
import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/products';
import { useI18n } from '@/lib/i18n';

export default function VanillePage() {
  const [filter, setFilter] = useState<'all' | 'poids' | 'tube'>('all');
  const { t, lang } = useI18n();
  const filtered = filter === 'all' ? products : products.filter(p => p.format === filter);

  return (
    <>
      <section className="page-hero pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="text-vanilla-400 text-sm tracking-[0.2em] uppercase">{t('catalog_label')}</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-100 mt-3 mb-4">{t('catalog_title')}</h1>
            <p className="text-cream-400 text-lg max-w-2xl mx-auto">{t('catalog_subtitle')}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter buttons */}
          <div className="flex justify-center gap-4 mb-12">
            {(['all', 'poids', 'tube'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-vanilla-400 text-dark-900'
                    : 'bg-dark-500 text-cream-400 hover:bg-dark-400'
                }`}
              >
                {f === 'all' ? t('catalog_all') : f === 'poids' ? t('catalog_by_weight') : t('catalog_tube')}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-sm text-cream-300">
            <p>{lang === 'fr' ? 'Ajoutez vos formats, puis envoyez une seule commande.' : 'Add your formats, then send one order.'}</p>
            <Link href="/panier" className="btn-outline-gold">{lang === 'fr' ? 'Voir mon panier →' : 'View my cart →'}</Link>
          </div>
          {/* Product grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
