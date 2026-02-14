import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Content from '@/models/Content';

export async function GET() {
    try {
        await connectDB();
        const content = await Content.findOne({ key: 'academics' });
        return NextResponse.json(content?.data || { levels: [], facilities: [] });
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ levels: [], facilities: [] }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await connectDB();
        const newData = await request.json();
        const content = await Content.findOneAndUpdate(
            { key: 'academics' },
            { data: newData },
            { upsert: true, new: true }
        );
        return NextResponse.json(content.data);
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed to update academics data' }, { status: 500 });
    }
}
