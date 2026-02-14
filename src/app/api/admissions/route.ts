import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admission from '@/models/Admission';

export async function GET() {
    try {
        await connectDB();
        const admissions = await Admission.find({}).sort({ createdAt: -1 });
        const mappedAdmissions = admissions.map(admission => ({
            ...admission.toObject(),
            id: admission._id.toString()
        }));
        return NextResponse.json(mappedAdmissions);
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const formData = await request.json();
        const date = new Date().toISOString().split('T')[0];

        const newAdmission = await Admission.create({
            ...formData,
            status: 'Pending',
            date: formData.date || date
        });

        return NextResponse.json({ success: true, id: newAdmission._id.toString() });
    } catch (error) {
        console.error('Create error:', error);
        return NextResponse.json({ error: 'Failed to submit admission' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await connectDB();
        const data = await request.json();
        const { id, ...updateData } = data;

        const updatedAdmission = await Admission.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedAdmission) {
            return NextResponse.json({ error: 'Admission not found' }, { status: 404 });
        }

        return NextResponse.json({
            ...updatedAdmission.toObject(),
            id: updatedAdmission._id.toString()
        });
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed to update admission' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await connectDB();
        const { id } = await request.json();
        const deletedAdmission = await Admission.findByIdAndDelete(id);
        if (!deletedAdmission) {
            return NextResponse.json({ error: 'Admission not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Failed to delete admission' }, { status: 500 });
    }
}
