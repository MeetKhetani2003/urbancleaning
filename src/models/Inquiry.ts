import mongoose, { Schema, Document } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  propertyInfo: string;
  additionalInfo: string;
  createdAt: Date;
}

const InquirySchema = new Schema<IInquiry>({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  propertyInfo: { type: String },
  additionalInfo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Inquiry = mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);
