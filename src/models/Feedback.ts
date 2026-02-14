import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    status: string;
}

const FeedbackSchema = new Schema<IFeedback>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, required: true, default: 'Unread' },
}, { timestamps: true });

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);
