import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmission extends Document {
    studentName: string;
    dob: string;
    gender: string;
    class: string;
    previousSchool?: string;
    fatherName: string;
    motherName: string;
    mobile: string;
    email?: string;
    address: string;
    status: string;
    date: string;
}

const AdmissionSchema = new Schema<IAdmission>({
    studentName: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    class: { type: String, required: true },
    previousSchool: String,
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: String,
    address: { type: String, required: true },
    status: { type: String, required: true, default: 'Pending' },
    date: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Admission || mongoose.model<IAdmission>('Admission', AdmissionSchema);
