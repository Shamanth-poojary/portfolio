import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  desc: string;
  tags: string[];
  year: string;
  bgGradient: string;
  imageBase64: string; // Storing the base64 string directly
  links: {
    live: string;
    github: string;
  };
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  tags: { type: [String], default: [] },
  year: { type: String, default: "" },
  bgGradient: { type: String, default: "" },
  imageBase64: { type: String, default: "" },
  links: {
    live: { type: String, default: "" },
    github: { type: String, default: "" }
  }
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
