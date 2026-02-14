import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'src/data/home.json');

export async function GET() {
    const data = fs.readFileSync(dataFile, 'utf8');
    return NextResponse.json(JSON.parse(data));
}

export async function PUT(req: Request) {
    const newData = await req.json();
    fs.writeFileSync(dataFile, JSON.stringify(newData, null, 2));
    return NextResponse.json(newData);
}
