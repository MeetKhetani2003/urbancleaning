import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Inquiry } from '@/models/Inquiry';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Connect to database and save inquiry
    await connectDB();
    const inquiry = await Inquiry.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      date: new Date().toLocaleDateString(), // Or if they provide a date in the form
      address: data.address,
      additionalInfo: data.additionalInfo || '',
    });

    // Send email using nodemailer
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        // Create transporter (assuming Gmail for example, they can adjust host/port if needed)
        // If they use app passwords, it works seamlessly with Gmail
        const transporter = nodemailer.createTransport({
          service: 'gmail', // You can also use host: 'smtp.gmail.com', port: 465
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER, // Send to themselves (admin)
          subject: `New Service Inquiry: ${data.service}`,
          text: `
You have received a new inquiry for ${data.service}.

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email || 'N/A'}
Address: ${data.address}
Service: ${data.service}

Additional Info: ${data.additionalInfo || 'None'}
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // We don't fail the whole request if email fails, but we could.
      }
    } else {
      console.warn("EMAIL_USER or EMAIL_PASS not set in .env.local, skipping email.");
    }

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    console.error('Error in service inquiry:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}
