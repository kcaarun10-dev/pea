import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, getDoc } from 'firebase/firestore';

export async function GET() {
    try {
        const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const notices = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
        return NextResponse.json(notices);
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        const docRef = await addDoc(collection(db, 'notices'), {
            ...data,
            date: data.date || date,
            createdAt: new Date().toISOString()
        });

        const newDocSnap = await getDoc(docRef);

        return NextResponse.json({
            ...newDocSnap.data(),
            id: docRef.id
        });
    } catch (error) {
        console.error('Create error:', error);
        return NextResponse.json({ error: 'Failed to save notice' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, ...updateData } = data;

        const docRef = doc(db, 'notices', id);
        await updateDoc(docRef, updateData);

        const updatedDocSnap = await getDoc(docRef);

        return NextResponse.json({
            ...updatedDocSnap.data(),
            id: id
        });
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed to update notice' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const docRef = doc(db, 'notices', id);
        await deleteDoc(docRef);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Failed to delete notice' }, { status: 500 });
    }
}
