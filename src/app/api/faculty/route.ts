import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Faculty from '@/models/Faculty';

export async function GET() {
    try {
        await connectDB();
        const faculty = await Faculty.find({}).sort({ createdAt: -1 });
        // Map _id to id for frontend compatibility
        const mappedFaculty = faculty.map(member => ({
            ...member.toObject(),
            id: member._id.toString()
        }));
        return NextResponse.json(mappedFaculty);
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch faculty' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const data = await request.json();
        const newMember = await Faculty.create(data);
        return NextResponse.json({
            ...newMember.toObject(),
            id: newMember._id.toString()
        });
    } catch (error) {
        console.error('Create error:', error);
        return NextResponse.json({ error: 'Failed to add faculty member' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await connectDB();
        const data = await request.json();
        const { id, ...updateData } = data;
        const updatedMember = await Faculty.findByIdAndUpdate(id, updateData, { new: true });

        if (updatedMember) {
            return NextResponse.json({
                ...updatedMember.toObject(),
                id: updatedMember._id.toString()
            });
        }
        return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed to update faculty member' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await connectDB();
        const { id } = await request.json();
        await Faculty.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Failed to delete faculty member' }, { status: 500 });
    }
}
