import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Package } from '@/models/Package';

export async function GET() {
  try {
    await connectDB();
    const packages = await Package.find({}).sort({ _id: -1 });
    return NextResponse.json(packages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const pkg = await Package.create(data);
    return NextResponse.json(pkg, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}
