import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
    title: string;
    src: string;
    category: string;
}

const GallerySchema = new Schema<IGallery>({
    title: { type: String, required: true },
    src: { type: String, required: true },
    category: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);
