import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

export async function GET() {
    try {
        await connectDB();
        const gallery = await Gallery.find({}).sort({ createdAt: -1 });
        const mappedGallery = gallery.map(item => ({
            ...item.toObject(),
            id: item._id.toString()
        }));
        return NextResponse.json(mappedGallery);
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const data = await request.json();
        const newItem = await Gallery.create(data);
        return NextResponse.json({
            ...newItem.toObject(),
            id: newItem._id.toString()
        });
    } catch (error) {
        console.error('Create error:', error);
        return NextResponse.json({ error: 'Failed to add image' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await connectDB();
        const data = await request.json();
        const { id, ...updateData } = data;

        const updatedItem = await Gallery.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedItem) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        return NextResponse.json({
            ...updatedItem.toObject(),
            id: updatedItem._id.toString()
        });
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await connectDB();
        const { id } = await request.json();
        const deletedItem = await Gallery.findByIdAndDelete(id);
        if (!deletedItem) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
}
