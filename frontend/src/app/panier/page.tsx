'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/useCart';
import { useI18n } from '@/lib/i18n';
import { products } from '@/lib/products';
import { cartWhatsAppLink, MAX_QUANTITY } from '@/lib/cart';

export default function CartPage() {
  const { items, count, setQuantity } = useCart();
  const { lang } = useI18n();
  const fr = lang === 'fr';
  const lines = items.flatMap(item => {
    const product = products.find(p => p.id === item.productId);
    return product ? [{ product, quantity: item.quantity }] : [];
  });
  const total = lines.reduce((sum, { product, quantity }) => sum + (product.price_eur ?? 0) * quantity, 0);
  const knownPrices = lines.every(({ product }) => product.price_eur != null);
  const money = (value: number) => new Intl.NumberFormat(fr ? 'fr-FR' : 'en-GB', { style: 'currency', currency: 'EUR' }).format(value);
  return <section className="pt-32 pb-24 min-h-screen">
    <div className="container">
      <span className="text-vanilla-300 text-xs uppercase tracking-widest">{fr ? 'Votre sélection' : 'Your selection'}</span>
      <h1 className="mt-3 mb-4">{fr ? 'Mon panier' : 'My cart'}</h1>
      <p className="text-cream-400 mb-10">{fr ? 'Tous vos formats, une seule commande WhatsApp.' : 'All your formats in one WhatsApp order.'}</p>
      {!lines.length ? <div className="glass-card p-10 text-center">
        <h2 className="text-2xl mb-4">{fr ? 'Votre panier est vide' : 'Your cart is empty'}</h2>
        <p className="text-cream-400 mb-8">{fr ? 'Choisissez vos formats de vanille pour préparer votre commande.' : 'Choose your vanilla formats to prepare your order.'}</p>
        <Link href="/vanille" className="btn-gold">{fr ? 'Découvrir nos vanilles' : 'Explore our vanilla'}</Link>
      </div> : <div className="cart-layout">
        <div>
          <ul className="space-y-4">
            {lines.map(({ product, quantity }) => {
              const format = product.weight === 'tube' ? (fr ? 'Tube — 5 gousses' : 'Tube — 5 pods') : product.weight;
              return <li key={product.id} className="glass-card cart-item">
                <Link href={`/vanille/${product.slug}`} className="relative w-20 h-24 shrink-0 overflow-hidden rounded-lg"><Image src={product.image} alt={format} fill sizes="80px" className="object-cover" /></Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/vanille/${product.slug}`}><h2 className="text-xl">{format}</h2></Link>
                  <p className="text-cream-400 text-sm">{product.price_eur == null ? (fr ? 'Prix à confirmer' : 'Price to confirm') : `${money(product.price_eur)} / ${fr ? 'unité' : 'unit'}`}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button type="button" className="cart-quantity" aria-label={`${fr ? 'Diminuer' : 'Decrease'} ${format}`} disabled={quantity <= 1} onClick={() => setQuantity(product.id, quantity - 1)}>−</button>
                    <span aria-label={fr ? 'Quantité' : 'Quantity'}>{quantity}</span>
                    <button type="button" className="cart-quantity" aria-label={`${fr ? 'Augmenter' : 'Increase'} ${format}`} disabled={quantity >= MAX_QUANTITY} onClick={() => setQuantity(product.id, quantity + 1)}>+</button>
                    <button type="button" className="text-cream-400 text-xs underline underline-offset-4" aria-label={`${fr ? 'Retirer' : 'Remove'} ${format}`} onClick={() => setQuantity(product.id, 0)}>{fr ? 'Retirer' : 'Remove'}</button>
                  </div>
                </div>
                <strong className="text-vanilla-300 text-sm">{product.price_eur == null ? '—' : money(product.price_eur * quantity)}</strong>
              </li>;
            })}
          </ul>
          <Link href="/vanille" className="inline-block mt-8 text-vanilla-300 underline underline-offset-4">← {fr ? 'Continuer mes achats' : 'Continue shopping'}</Link>
        </div>
        <aside className="glass-card p-7 self-start lg:sticky lg:top-28">
          <h2 className="text-2xl mb-6">{fr ? 'Récapitulatif' : 'Order summary'}</h2>
          <p className="text-cream-400 mb-5">{count} {fr ? 'article(s)' : 'item(s)'} · {lines.length} {fr ? 'format(s)' : 'format(s)'}</p>
          <div className="flex justify-between gap-4 border-t border-vanilla-400/20 pt-5 mb-2"><span>{fr ? (knownPrices ? 'Total estimé' : 'Sous-total connu') : (knownPrices ? 'Estimated total' : 'Known subtotal')}</span><strong className="text-vanilla-300">{money(total)}</strong></div>
          <p className="text-cream-400 text-xs mb-7">{fr ? 'Hors livraison. Prix et disponibilités à confirmer.' : 'Excluding delivery. Prices and availability to be confirmed.'}</p>
          <a href={cartWhatsAppLink(items, products, lang)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full text-center">{fr ? 'Commander sur WhatsApp' : 'Order on WhatsApp'} ↗</a>
          <p className="text-cream-400 text-xs mt-4">{fr ? 'Un seul message reprend tous les formats, quantités et montants. Vous pourrez le vérifier avant de l’envoyer.' : 'One message includes every format, quantity and amount. Review it before sending.'}</p>
        </aside>
      </div>}
    </div>
  </section>;
}
