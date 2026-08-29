import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  businessName: string;
  descriptor: string;
  location: string;
  serviceArea: string;
  phone: string;
  email: string;
  whatsapp: string;
}

const ContactSchema = new Schema<IContact>({
  businessName: { type: String, required: true },
  descriptor: { type: String, required: true },
  location: { type: String, required: true },
  serviceArea: { type: String, required: true },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  whatsapp: { type: String, default: '' },
});

export const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
