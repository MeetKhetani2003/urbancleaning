import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Inquiry } from '@/models/Inquiry';

export async function GET() {
  try {
    await connectDB();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
