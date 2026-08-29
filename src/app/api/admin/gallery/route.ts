import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Gallery, BeforeAfter } from '@/models/Gallery';

export async function GET() {
  try {
    await connectDB();
    const items = await Gallery.find({}).sort({ _id: -1 });
    const comparisons = await BeforeAfter.find({}).sort({ _id: -1 });
    return NextResponse.json({ items, comparisons });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    let result;
    if (data.type === 'comparison') {
      result = await BeforeAfter.create(data);
    } else {
      result = await Gallery.create(data);
    }
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
