import mongoose, { Schema, Document } from 'mongoose';

export interface IFaculty extends Document {
    name: string;
    role: string;
    dept: string;
    image: string;
    email?: string;
    phone?: string;
    bio?: string;
    qualification?: string;
    experience?: string;
    specialties?: string;
    whatsapp?: string;
    facebook?: string;
    instagram?: string;
}

const FacultySchema = new Schema<IFaculty>({
    name: { type: String, required: true },
    role: { type: String, required: true },
    dept: { type: String, required: true },
    image: String,
    email: String,
    phone: String,
    bio: String,
    qualification: String,
    experience: String,
    specialties: String,
    whatsapp: String,
    facebook: String,
    instagram: String,
}, { timestamps: true });

export default mongoose.models.Faculty || mongoose.model<IFaculty>('Faculty', FacultySchema);
