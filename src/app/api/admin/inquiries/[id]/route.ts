import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Inquiry } from '@/models/Inquiry';

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    await connectDB();
    await Inquiry.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
