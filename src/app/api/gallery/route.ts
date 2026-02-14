import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/gallery.json');

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
        const newImage = await request.json();
        const fileData = fs.readFileSync(dataPath, 'utf8');
        const gallery = JSON.parse(fileData);

        const imageWithId = {
            ...newImage,
            id: Date.now().toString()
        };
        gallery.unshift(imageWithId);
        fs.writeFileSync(dataPath, JSON.stringify(gallery, null, 2));

        return NextResponse.json(imageWithId);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add image' }, { status: 500 });
    }
}
export async function PUT(request: Request) {
    try {
        const updatedImage = await request.json();
        const fileData = fs.readFileSync(dataPath, 'utf8');
        let gallery = JSON.parse(fileData);

        const index = gallery.findIndex((img: any) => img.id === updatedImage.id);
        if (index === -1) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        gallery[index] = { ...gallery[index], ...updatedImage };
        fs.writeFileSync(dataPath, JSON.stringify(gallery, null, 2));

        return NextResponse.json(gallery[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const fileData = fs.readFileSync(dataPath, 'utf8');
        let gallery = JSON.parse(fileData);

        const updatedGallery = gallery.filter((img: any) => img.id !== id);
        if (gallery.length === updatedGallery.length) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        fs.writeFileSync(dataPath, JSON.stringify(updatedGallery, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
}
