import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, query, orderBy, getDoc } from 'firebase/firestore';

export async function GET() {
    try {
        const q = query(collection(db, 'feedback'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const feedback = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
        return NextResponse.json(feedback);
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const docRef = await addDoc(collection(db, 'feedback'), {
            ...data,
            date: new Date().toISOString(),
            status: 'New',
            createdAt: new Date().toISOString()
        });

        const newDocSnap = await getDoc(docRef);

        return NextResponse.json({
            ...newDocSnap.data(),
            id: docRef.id
        });
    } catch (error) {
        console.error('Create error:', error);
        return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const docRef = doc(db, 'feedback', id);
        await deleteDoc(docRef);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
