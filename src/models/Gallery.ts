import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  category: string;
  span?: string;
  image: string;
}

export interface IBeforeAfter extends Document {
  title: string;
  before: string;
  after: string;
}

const GallerySchema = new Schema<IGallery>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  span: { type: String },
  image: { type: String, required: true },
});

const BeforeAfterSchema = new Schema<IBeforeAfter>({
  title: { type: String, required: true },
  before: { type: String, required: true },
  after: { type: String, required: true },
});

export const Gallery = mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);
export const BeforeAfter = mongoose.models.BeforeAfter || mongoose.model<IBeforeAfter>('BeforeAfter', BeforeAfterSchema);
