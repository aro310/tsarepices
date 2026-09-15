import { NextResponse } from 'next/server';

const CATALOG_URL = process.env.CATALOG_SERVICE_URL || 'http://localhost:5001';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const endpoint = slug ? `${CATALOG_URL}/products/${slug}` : `${CATALOG_URL}/products`;
    const res = await fetch(endpoint, { cache: 'no-store' });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    // Fallback to static data
    const { products } = await import('@/lib/products');
    return NextResponse.json({ success: true, data: products, count: products.length });
  }
}
