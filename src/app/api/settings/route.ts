import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Setting from '@/models/Setting';

export async function GET() {
    try {
        await connectDB();
        const settings = await Setting.findOne({});
        return NextResponse.json(settings || {});
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await connectDB();
        const updatedSettings = await request.json();
        const settings = await Setting.findOneAndUpdate({}, updatedSettings, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        });
        return NextResponse.json(settings);
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
