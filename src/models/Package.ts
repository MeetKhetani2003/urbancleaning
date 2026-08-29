import mongoose, { Schema, Document } from 'mongoose';

export interface IPackage extends Document {
  slug: string;
  title: string;
  description: string;
  rooms: string;
  included: string[];
  price?: string;
}

const PackageSchema = new Schema<IPackage>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  rooms: { type: String, required: true },
  image: { type: String, required: true },
  included: [{ type: String }],
  price: { type: String, default: '' },
});

export const Package = mongoose.models.Package || mongoose.model<IPackage>('Package', PackageSchema);
