import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Content from '@/models/Content';

export async function GET() {
    try {
        await connectDB();
        const content = await Content.findOne({ key: 'admissions-page' });
        return NextResponse.json(content?.data || {});
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await connectDB();
        const newData = await req.json();
        const content = await Content.findOneAndUpdate(
            { key: 'admissions-page' },
            { data: newData },
            { upsert: true, new: true }
        );
        return NextResponse.json(content.data);
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
