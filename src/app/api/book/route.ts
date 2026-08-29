import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Inquiry } from '@/models/Inquiry';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await connectDB();
    const inquiry = await Inquiry.create(data);
    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}
