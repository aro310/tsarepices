import { NextResponse } from 'next/server';

const CONTACT_URL = process.env.CONTACT_SERVICE_URL || 'http://localhost:5003';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await fetch(`${CONTACT_URL}/messages`, {
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
