import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/notices.json');

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
        const newNotice = await request.json();
        const fileData = fs.readFileSync(dataPath, 'utf8');
        const notices = JSON.parse(fileData);

        const noticeWithId = {
            ...newNotice,
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };

        notices.unshift(noticeWithId);
        fs.writeFileSync(dataPath, JSON.stringify(notices, null, 2));

        return NextResponse.json(noticeWithId);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save notice' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedNotice = await request.json();
        const fileData = fs.readFileSync(dataPath, 'utf8');
        let notices = JSON.parse(fileData);

        const index = notices.findIndex((n: any) => n.id === updatedNotice.id);
        if (index === -1) {
            return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
        }

        notices[index] = { ...notices[index], ...updatedNotice };
        fs.writeFileSync(dataPath, JSON.stringify(notices, null, 2));

        return NextResponse.json(notices[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update notice' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const fileData = fs.readFileSync(dataPath, 'utf8');
        let notices = JSON.parse(fileData);

        const updatedNotices = notices.filter((n: any) => n.id !== id);
        if (notices.length === updatedNotices.length) {
            return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
        }

        fs.writeFileSync(dataPath, JSON.stringify(updatedNotices, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete notice' }, { status: 500 });
    }
}
