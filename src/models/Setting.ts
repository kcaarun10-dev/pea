import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document {
    schoolName1: string;
    schoolName2: string;
    email: string;
    phone: string;
    location: string;
    officeHours: string;
    whatsapp: string;
    logo: string;
    description: string;
    established: string;
    footerSlogan: string;
    socials: {
        facebook: string;
        twitter: string;
        instagram: string;
        youtube: string;
    };
    mapUrl: string;
    leadership: Array<{
        id: string;
        name: string;
        role: string;
        fb: string;
        bio: string;
        image: string;
    }>;
}

const SettingSchema = new Schema<ISetting>({
    schoolName1: String,
    schoolName2: String,
    email: String,
    phone: String,
    location: String,
    officeHours: String,
    whatsapp: String,
    logo: String,
    description: String,
    established: String,
    footerSlogan: String,
    socials: {
        facebook: String,
        twitter: String,
        instagram: String,
        youtube: String,
    },
    mapUrl: String,
    leadership: [{
        id: String,
        name: String,
        role: String,
        fb: String,
        bio: String,
        image: String,
    }]
}, { timestamps: true });

export default mongoose.models.Setting || mongoose.model<ISetting>('Setting', SettingSchema);
