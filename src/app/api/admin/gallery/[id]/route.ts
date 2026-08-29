import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Gallery, BeforeAfter } from '@/models/Gallery';

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    await connectDB();
    const data = await request.json();
    
    let result;
    if (data.type === 'comparison') {
      result = await BeforeAfter.findByIdAndUpdate(params.id, data, { new: true });
    } else {
      result = await Gallery.findByIdAndUpdate(params.id, data, { new: true });
    }
    
    if (!result) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    await connectDB();
    
    // Try to delete from both collections if type is unknown, but URL usually has type param if we built it.
    // Easiest is to try both.
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    
    if (type === 'comparison') {
      await BeforeAfter.findByIdAndDelete(params.id);
    } else {
      await Gallery.findByIdAndDelete(params.id);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
