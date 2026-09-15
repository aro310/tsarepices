import { NextResponse } from 'next/server';

const CATALOG_URL = process.env.CATALOG_SERVICE_URL || 'http://localhost:5001';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const res = await fetch(`${CATALOG_URL}/products/${slug}`, { cache: 'no-store' });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    const { products } = await import('@/lib/products');
    const product = products.find(p => p.slug === slug);
    if (!product) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: product });
  }
}
