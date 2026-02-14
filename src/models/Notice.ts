import mongoose, { Schema, Document } from 'mongoose';

export interface INotice extends Document {
    title: string;
    category: string;
    type: string;
    content: string;
    image?: string;
    date: string;
}

const NoticeSchema = new Schema<INotice>({
    title: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    content: { type: String, required: true },
    image: String,
    date: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Notice || mongoose.model<INotice>('Notice', NoticeSchema);
