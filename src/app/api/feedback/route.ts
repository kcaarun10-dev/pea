import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Feedback from '@/models/Feedback';

export async function GET() {
    try {
        await connectDB();
        const feedback = await Feedback.find({}).sort({ createdAt: -1 });
        const mappedFeedback = feedback.map(item => ({
            ...item.toObject(),
            id: item._id.toString()
        }));
        return NextResponse.json(mappedFeedback);
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const data = await request.json();

        const newEntry = await Feedback.create({
            ...data,
            date: new Date().toISOString(),
            status: 'New'
        });

        return NextResponse.json({
            ...newEntry.toObject(),
            id: newEntry._id.toString()
        });
    } catch (error) {
        console.error('Create error:', error);
        return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const deletedFeedback = await Feedback.findByIdAndDelete(id);
        if (!deletedFeedback) {
            return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
