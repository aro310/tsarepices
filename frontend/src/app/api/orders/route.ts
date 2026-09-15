import { NextResponse } from 'next/server';

const ORDERS_URL = process.env.ORDERS_SERVICE_URL || 'http://localhost:5002';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await fetch(`${ORDERS_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, error: 'Service indisponible' }, { status: 503 });
  }
}

export async function GET() {
  try {
    const res = await fetch(`${ORDERS_URL}/orders`, { cache: 'no-store' });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ success: false, error: 'Service indisponible' }, { status: 503 });
  }
}
