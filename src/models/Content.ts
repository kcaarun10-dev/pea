import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
    key: string;
    data: any;
}

const ContentSchema = new Schema<IContent>({
    key: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });

export default mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);
