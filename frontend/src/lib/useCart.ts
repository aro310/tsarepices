'use client';
import { useSyncExternalStore } from 'react';
import { products } from '@/lib/products';
import { readCart, updateCart } from '@/lib/cart';

const KEY = 'tsart-cart-v1';
let fallback = '';
let memoryOnly = false;
const listeners = new Set<() => void>();
function snapshot() {
  if (memoryOnly) return fallback;
  try { return window.localStorage.getItem(KEY) ?? fallback; } catch { return fallback; }
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  const sync = (event: StorageEvent) => { if (event.key === KEY || event.key === null) { fallback = ''; listener(); } };
  window.addEventListener('storage', sync);
  return () => { listeners.delete(listener); window.removeEventListener('storage', sync); };
}
function save(value: string) {
  fallback = value;
  try { window.localStorage.setItem(KEY, value); } catch { memoryOnly = true; /* Keep the cart usable when storage is unavailable. */ }
  listeners.forEach(listener => listener());
}
const serverSnapshot = () => '';

export function useCart() {
  const value = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const items = readCart(value, products);
  return {
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    add(productId: number, quantity: number) {
      if (!products.some(p => p.id === productId) || !Number.isInteger(quantity) || quantity < 1) return;
      const current = readCart(snapshot(), products);
      save(JSON.stringify(updateCart(current, productId, (current.find(item => item.productId === productId)?.quantity ?? 0) + quantity)));
    },
    setQuantity(productId: number, quantity: number) {
      if (!products.some(p => p.id === productId)) return;
      save(JSON.stringify(updateCart(readCart(snapshot(), products), productId, quantity)));
    },
  };
}
