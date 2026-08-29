import mongoose, { Schema, Document } from 'mongoose';

export interface IPrinciple {
  icon: string;
  title: string;
  description: string;
}

export interface IStaffMember {
  name: string;
  role: string;
  image: string;
}

export interface IAbout extends Document {
  hero: {
    title: string;
    description: string;
    image: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
  };
  principles: {
    eyebrow: string;
    title: string;
    items: IPrinciple[];
  };
  local: {
    eyebrow: string;
    title: string;
    description: string;
  };
  owner: {
    name: string;
    role: string;
    bio: string;
    image: string;
  };
  staff: IStaffMember[];
}

const AboutSchema = new Schema<IAbout>({
  hero: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  intro: {
    eyebrow: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  principles: {
    eyebrow: { type: String, default: '' },
    title: { type: String, default: '' },
    items: [
      {
        icon: { type: String, default: '' },
        title: { type: String, default: '' },
        description: { type: String, default: '' },
      }
    ],
  },
  local: {
    eyebrow: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  owner: {
    name: { type: String, default: '' },
    role: { type: String, default: '' },
    bio: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  staff: [
    {
      name: { type: String, default: '' },
      role: { type: String, default: '' },
      image: { type: String, default: '' },
    }
  ],
});

export const About = mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);
