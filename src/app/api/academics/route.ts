import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/academics.json');

export async function GET() {
    try {
        const fileData = fs.readFileSync(dataPath, 'utf8');
        return NextResponse.json(JSON.parse(fileData));
    } catch (error) {
        return NextResponse.json({ levels: [], facilities: [] }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedData = await request.json();
        fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2));
        return NextResponse.json(updatedData);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update academics data' }, { status: 500 });
    }
}
