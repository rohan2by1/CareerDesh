import mongoose, { Schema } from 'mongoose';

export interface IJob {
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  applyLink: string;
  salary?: string;
  type: string; // Full-time, Part-time, Contract, etc.
  postedDate: Date;
  deadline?: Date;
  isActive: boolean;
}

const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    applyLink: { type: String, required: true },
    salary: { type: String },
    type: { type: String, required: true },
    postedDate: { type: Date, default: Date.now },
    deadline: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);
