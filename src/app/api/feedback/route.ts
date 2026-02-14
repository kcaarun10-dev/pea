import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/feedback.json');

async function getFeedback() {
    try {
        const data = await readFile(DATA_PATH, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function saveFeedback(data: any[]) {
    await writeFile(DATA_PATH, JSON.stringify(data, null, 4));
}

export async function GET() {
    const feedback = await getFeedback();
    return NextResponse.json(feedback);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const feedback = await getFeedback();

        const newEntry = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            status: 'New',
            ...body
        };

        feedback.unshift(newEntry); // Newest first
        await saveFeedback(feedback);

        return NextResponse.json(newEntry);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        let feedback = await getFeedback();
        feedback = feedback.filter((item: any) => item.id !== id);
        await saveFeedback(feedback);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
