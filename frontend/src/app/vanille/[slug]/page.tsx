'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { products } from '@/lib/products';
import AddToCartButton from '@/components/products/AddToCartButton';
import Badge from '@/components/ui/Badge';
import ProductCard from '@/components/products/ProductCard';
import { useI18n } from '@/lib/i18n';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = products.find(p => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const { t } = useI18n();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900">
        <div className="text-center">
          <h1 className="font-display text-4xl text-cream-100 mb-4">Produit non trouvé</h1>
          <Link href="/vanille" className="text-vanilla-400 hover:text-vanilla-300">{t('catalog_title')}</Link>
        </div>
      </div>
    );
  }

  const unitEur = product.price_eur ?? 0;
  const totalEur = unitEur * quantity;
  const otherProducts = products.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="pt-28 pb-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <Link href="/" className="text-cream-400 hover:text-vanilla-400">{t('nav_home')}</Link>
            <span className="text-cream-500 mx-2">/</span>
            <Link href="/vanille" className="text-cream-400 hover:text-vanilla-400">{t('nav_vanille')}</Link>
            <span className="text-cream-500 mx-2">/</span>
            <span className="text-vanilla-400">{product.subtitle}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] lg:h-[550px] rounded-2xl overflow-hidden"
            >
              <Image src={product.image} alt={`${product.name} ${product.weight}`} fill className="object-cover" priority />
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="flex gap-2 flex-wrap mb-4">
                {product.quality.map(q => <Badge key={q}>{q}</Badge>)}
              </div>
              <h1 className="font-display text-3xl md:text-4xl text-cream-100 mb-2">{product.name}</h1>
              <p className="text-vanilla-400 text-xl mb-6">{product.subtitle}</p>

              <div className="glass-card rounded-xl p-6 mb-6 space-y-5">
                {/* Unit price */}
                <div className="flex items-center justify-between">
                  <span className="text-cream-400 text-sm uppercase tracking-widest">{t('product_unit_price')}</span>
                  <span className="text-vanilla-400 text-2xl font-display font-bold">
                    {unitEur > 0 ? `${unitEur} €` : '—'}
                  </span>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between">
                  <span className="text-cream-400 text-sm uppercase tracking-widest">{t('product_quantity')}</span>
                  <div className="flex items-center gap-3">
                    <button
                      aria-label="Diminuer"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-full bg-dark-500 border border-vanilla-400/20 text-cream-100 flex items-center justify-center hover:bg-vanilla-400 hover:text-dark-900 transition-all font-bold text-xl leading-none"
                    >−</button>
                    <span className="text-cream-100 text-lg font-semibold w-8 text-center">{quantity}</span>
                    <button
                      aria-label="Augmenter"
                      onClick={() => setQuantity(Math.min(999, quantity + 1))}
                      className="w-9 h-9 rounded-full bg-dark-500 border border-vanilla-400/20 text-cream-100 flex items-center justify-center hover:bg-vanilla-400 hover:text-dark-900 transition-all font-bold text-xl leading-none"
                    >+</button>
                  </div>
                </div>

                {/* Total */}
                {quantity > 1 && unitEur > 0 && (
                  <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-vanilla-400/10 border border-vanilla-400/20">
                    <span className="text-cream-400 text-sm uppercase tracking-widest">{t('product_total')}</span>
                    <span className="text-vanilla-400 font-display font-bold text-xl">{totalEur} €</span>
                  </div>
                )}

                {/* Availability */}
                <div className="flex items-center justify-between border-t border-vanilla-400/10 pt-4">
                  <span className="text-cream-400 text-sm uppercase tracking-widest">{t('product_availability')}</span>
                  <Badge variant={product.inStock ? 'green' : 'neutral'}>
                    {product.inStock ? t('product_in_stock') : t('product_on_order')}
                  </Badge>
                </div>
              </div>

              <AddToCartButton key={product.id} productId={product.id} quantity={quantity} />

              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg text-cream-100 mb-2">{t('product_description')}</h3>
                  <p className="text-cream-400 leading-relaxed">{product.description}</p>
                </div>
                <div>
                  <h3 className="font-display text-lg text-cream-100 mb-2">{t('product_origin')}</h3>
                  <p className="text-cream-400">{product.origin}</p>
                </div>
                <div>
                  <h3 className="font-display text-lg text-cream-100 mb-2">{t('product_conservation')}</h3>
                  <p className="text-cream-400 leading-relaxed">{product.conservation}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-cream-100 mb-8 text-center">{t('product_others')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
