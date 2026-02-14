import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export async function GET() {
    try {
        const docRef = doc(db, 'settings', 'site');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return NextResponse.json(docSnap.data());
        } else {
            return NextResponse.json({});
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedSettings = await request.json();
        const docRef = doc(db, 'settings', 'site');

        // Use setDoc with merge: true to emulate findOneAndUpdate with upsert
        await setDoc(docRef, updatedSettings, { merge: true });

        return NextResponse.json(updatedSettings);
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
