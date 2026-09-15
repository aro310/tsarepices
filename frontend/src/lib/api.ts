const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/api/products`, { cache: 'no-store' });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

export async function fetchProduct(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/api/products/${slug}`, { cache: 'no-store' });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

export async function submitContact(formData: { name: string; email: string; subject: string; message: string }) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return res.json();
}

export async function createOrder(orderData: {
  product_slug: string;
  product_name: string;
  product_weight: string;
  quantity?: number;
  notes?: string;
}) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return res.json();
}
