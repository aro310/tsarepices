import type { Product } from '@/types';

export interface CartItem { productId: number; quantity: number }
export const MAX_QUANTITY = 999;

export function readCart(value: string, catalog: Product[]): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    const quantities = new Map<number, number>();
    for (const item of parsed) {
      if (!item || !catalog.some(p => p.id === item.productId) || !Number.isInteger(item.quantity) || item.quantity <= 0) continue;
      quantities.set(item.productId, Math.min(MAX_QUANTITY, (quantities.get(item.productId) ?? 0) + item.quantity));
    }
    return Array.from(quantities, ([productId, quantity]) => ({ productId, quantity }));
  } catch { return []; }
}

export function updateCart(items: CartItem[], productId: number, quantity: number): CartItem[] {
  if (!Number.isFinite(quantity)) return items;
  const nextQuantity = Math.min(MAX_QUANTITY, Math.floor(quantity));
  if (nextQuantity <= 0) return items.filter(item => item.productId !== productId);
  if (items.some(item => item.productId === productId)) return items.map(item => item.productId === productId ? { ...item, quantity: nextQuantity } : item);
  return [...items, { productId, quantity: nextQuantity }];
}

export function cartWhatsAppLink(items: CartItem[], catalog: Product[], lang: 'fr' | 'en'): string {
  const fr = lang === 'fr';
  const lines = items.flatMap(item => {
    const product = catalog.find(p => p.id === item.productId);
    return product ? [{ product, quantity: item.quantity }] : [];
  });
  if (!lines.length) return '';
  const total = lines.reduce((sum, { product, quantity }) => sum + (product.price_eur ?? 0) * quantity, 0);
  const knownPrices = lines.every(({ product }) => product.price_eur != null);
  const message = [
    fr ? "Bonjour Ts'Art Épices !" : "Hello Ts'Art Épices!", '',
    fr ? 'Je souhaite commander les formats suivants :' : 'I would like to order the following formats:', '',
    ...lines.map(({ product, quantity }) => {
      const format = product.weight === 'tube' ? (fr ? 'Tube de 5 gousses' : 'Tube of 5 pods') : product.weight;
      const price = product.price_eur == null ? (fr ? 'prix à confirmer' : 'price to confirm') : `${product.price_eur} € × ${quantity} = ${Number((product.price_eur * quantity).toFixed(2))} €`;
      return `• ${product.name} — ${format}\n  ${fr ? 'Quantité' : 'Quantity'} : ${quantity} · ${price}`;
    }), '',
    `${fr ? (knownPrices ? 'Total estimé hors livraison' : 'Sous-total des prix connus, hors livraison') : (knownPrices ? 'Estimated total excluding delivery' : 'Known-price subtotal excluding delivery')} : ${Number(total.toFixed(2))} €`, '',
    fr ? 'Merci de confirmer les disponibilités, le total et les modalités de livraison.' : 'Please confirm availability, the total and delivery details.',
  ].join('\n');
  return `https://wa.me/261379246750?text=${encodeURIComponent(message)}`;
}
