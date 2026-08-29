import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  heroCopy: string;
  whatWeClean: string[];
  whatWeCleanImages: string[];
  benefit: string;
  price?: string;
}

const ServiceSchema = new Schema<IService>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true }, // GridFS ID or relative URL
  description: { type: String, required: true },
  heroCopy: { type: String, required: true },
  whatWeClean: [{ type: String }],
  whatWeCleanImages: [{ type: String }],
  benefit: { type: String, required: true },
  price: { type: String, default: '' },
});

export const Service = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
