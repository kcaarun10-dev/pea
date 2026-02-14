import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Notice from '@/models/Notice';

export async function GET() {
    try {
        await connectDB();
        const notices = await Notice.find({}).sort({ createdAt: -1 });
        const mappedNotices = notices.map(notice => ({
            ...notice.toObject(),
            id: notice._id.toString()
        }));
        return NextResponse.json(mappedNotices);
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const data = await request.json();

        const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const newNotice = await Notice.create({
            ...data,
            date: data.date || date
        });

        return NextResponse.json({
            ...newNotice.toObject(),
            id: newNotice._id.toString()
        });
    } catch (error) {
        console.error('Create error:', error);
        return NextResponse.json({ error: 'Failed to save notice' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await connectDB();
        const data = await request.json();
        const { id, ...updateData } = data;

        const updatedNotice = await Notice.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedNotice) {
            return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
        }

        return NextResponse.json({
            ...updatedNotice.toObject(),
            id: updatedNotice._id.toString()
        });
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed to update notice' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await connectDB();
        const { id } = await request.json();
        const deletedNotice = await Notice.findByIdAndDelete(id);
        if (!deletedNotice) {
            return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Failed to delete notice' }, { status: 500 });
    }
}
