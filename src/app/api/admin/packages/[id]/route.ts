import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Package } from '@/models/Package';

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    await connectDB();
    const data = await request.json();
    const pkg = await Package.findByIdAndUpdate(params.id, data, { new: true });
    if (!pkg) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(pkg);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    await connectDB();
    await Package.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
