import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
import { mkdir } from 'fs/promises';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create a unique filename to avoid collisions
        const ext = path.extname(file.name);
        const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        const filePath = path.join(uploadDir, filename);

        // Ensure the directory exists (though we already ran mkdir -p)
        await mkdir(uploadDir, { recursive: true });

        await writeFile(filePath, buffer);
        const relativePath = `/uploads/${filename}`;

        return NextResponse.json({ url: relativePath });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
