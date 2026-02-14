import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function GET() {
    try {
        const docRef = doc(db, 'content', 'admissions-page');
        const docSnap = await getDoc(docRef);
        return NextResponse.json(docSnap.exists() ? docSnap.data() : {});
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const newData = await req.json();
        const docRef = doc(db, 'content', 'admissions-page');
        await setDoc(docRef, newData, { merge: true });
        return NextResponse.json(newData);
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
