import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Contact } from '@/models/Contact';

export async function GET() {
  try {
    await connectDB();
    const contact = await Contact.findOne({});
    return NextResponse.json(contact || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    let contact = await Contact.findOne({});
    if (contact) {
      contact = await Contact.findByIdAndUpdate(contact._id, data, { new: true });
    } else {
      contact = await Contact.create(data);
    }
    
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
