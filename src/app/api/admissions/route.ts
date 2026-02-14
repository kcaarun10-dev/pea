import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/admissions.json');

export async function GET() {
    try {
        const fileData = fs.readFileSync(dataPath, 'utf8');
        return NextResponse.json(JSON.parse(fileData));
    } catch (error) {
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.json();
        const fileData = fs.readFileSync(dataPath, 'utf8');
        const admissions = JSON.parse(fileData);

        const newAdmission = {
            ...formData,
            id: Date.now().toString(),
            status: 'Pending',
            date: new Date().toISOString().split('T')[0]
        };

        admissions.unshift(newAdmission);
        fs.writeFileSync(dataPath, JSON.stringify(admissions, null, 2));

        return NextResponse.json({ success: true, id: newAdmission.id });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to submit admission' }, { status: 500 });
    }
}
export async function PUT(request: Request) {
    try {
        const updatedAdmission = await request.json();
        const fileData = fs.readFileSync(dataPath, 'utf8');
        let admissions = JSON.parse(fileData);

        const index = admissions.findIndex((a: any) => a.id === updatedAdmission.id);
        if (index === -1) {
            return NextResponse.json({ error: 'Admission not found' }, { status: 404 });
        }

        admissions[index] = { ...admissions[index], ...updatedAdmission };
        fs.writeFileSync(dataPath, JSON.stringify(admissions, null, 2));

        return NextResponse.json(admissions[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update admission' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const fileData = fs.readFileSync(dataPath, 'utf8');
        let admissions = JSON.parse(fileData);

        const updatedAdmissions = admissions.filter((a: any) => a.id !== id);
        if (admissions.length === updatedAdmissions.length) {
            return NextResponse.json({ error: 'Admission not found' }, { status: 404 });
        }

        fs.writeFileSync(dataPath, JSON.stringify(updatedAdmissions, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete admission' }, { status: 500 });
    }
}
