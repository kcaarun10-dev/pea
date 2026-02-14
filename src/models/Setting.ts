import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document {
    schoolName: string;
    shortName: string;
    logo: string;
    address: string;
    phone: string;
    email: string;
    socials: {
        facebook: string;
        instagram: string;
        whatsapp: string;
        youtube: string;
    };
}

const SettingSchema = new Schema<ISetting>({
    schoolName: { type: String, required: true },
    shortName: { type: String, required: true },
    logo: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    socials: {
        facebook: String,
        instagram: String,
        whatsapp: String,
        youtube: String,
    },
}, { timestamps: true });

export default mongoose.models.Setting || mongoose.model<ISetting>('Setting', SettingSchema);
