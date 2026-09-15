import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
// Compile the pure cart module with the project's installed TypeScript.
const source = fs.readFileSync('src/lib/cart.ts', 'utf8');
const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const cartModule = { exports: {} };
new Function('exports', 'module', output)(cartModule.exports, cartModule);
const { readCart, updateCart, cartWhatsAppLink } = cartModule.exports;
const catalog = [{ id: 1, name: 'Vanille Bourbon', weight: '50g', price_eur: 5 }, { id: 2, name: 'Vanille Bourbon', weight: 'tube', price_eur: 7 }];

test('restores valid quantities, merges duplicates and rejects corrupt storage', () => {
  assert.deepEqual(readCart('not json', catalog), []);
  assert.deepEqual(readCart('{}', catalog), []);
  assert.deepEqual(readCart(JSON.stringify([{productId:1,quantity:2},{productId:1,quantity:3},{productId:2,quantity:-1},{productId:44,quantity:3},{productId:2,quantity:1.5},null]),catalog), [{productId:1,quantity:5}]);
});
test('updates in place, removes items and limits quantities', () => {
  const items = [{productId:1,quantity:2},{productId:2,quantity:1}];
  assert.deepEqual(updateCart(items,1,4), [{productId:1,quantity:4},{productId:2,quantity:1}]);
  assert.deepEqual(updateCart(items,1,0), [{productId:2,quantity:1}]);
  assert.equal(updateCart([],1,10000)[0].quantity,999);
  assert.deepEqual(updateCart(items,1,NaN),items);
});
test('one WhatsApp message includes all formats, quantities and the correct total', () => {
  const link = cartWhatsAppLink([{productId:1,quantity:3},{productId:2,quantity:2}], catalog, 'fr');
  const url = new URL(link);
  assert.equal(url.pathname, '/261379246750');
  const text = url.searchParams.get('text');
  assert.match(text,/50g\n  Quantité : 3/);
  assert.match(text,/Tube de 5 gousses\n  Quantité : 2/);
  assert.match(text,/Total estimé hors livraison : 29 €/);
  assert.equal((text.match(/• /g) || []).length,2);
  assert.equal(cartWhatsAppLink([],catalog,'fr'),'');
});
test('English message and unknown prices are explicit', () => {
  const text = new URL(cartWhatsAppLink([{productId:2,quantity:1}], [{...catalog[1],price_eur:null}], 'en')).searchParams.get('text');
  assert.match(text,/Tube of 5 pods/);
  assert.match(text,/price to confirm/);
  assert.match(text,/Known-price subtotal/);
});
