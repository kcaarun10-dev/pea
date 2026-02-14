import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function GET() {
    try {
        const docRef = doc(db, 'content', 'academics');
        const docSnap = await getDoc(docRef);
        return NextResponse.json(docSnap.exists() ? docSnap.data() : { levels: [], facilities: [] });
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ levels: [], facilities: [] }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const newData = await request.json();
        const docRef = doc(db, 'content', 'academics');
        await setDoc(docRef, newData, { merge: true });
        return NextResponse.json(newData);
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed to update academics data' }, { status: 500 });
    }
}
