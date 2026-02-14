import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/faculty.json');

async function getFaculty() {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
}

async function saveFaculty(data: any) {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
}

export async function GET() {
    try {
        const faculty = await getFaculty();
        return NextResponse.json(faculty);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch faculty' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const faculty = await getFaculty();
        const newMember = await request.json();
        const addedMember = {
            ...newMember,
            id: Date.now().toString()
        };
        faculty.push(addedMember);
        await saveFaculty(faculty);
        return NextResponse.json(addedMember);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add faculty member' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const faculty = await getFaculty();
        const updatedMember = await request.json();
        const index = faculty.findIndex((f: any) => f.id === updatedMember.id);
        if (index > -1) {
            faculty[index] = updatedMember;
            await saveFaculty(faculty);
            return NextResponse.json(updatedMember);
        }
        return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update faculty member' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const faculty = await getFaculty();
        const { id } = await request.json();
        const filteredFaculty = faculty.filter((f: any) => f.id !== id);
        await saveFaculty(filteredFaculty);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete faculty member' }, { status: 500 });
    }
}
