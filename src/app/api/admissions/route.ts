import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, getDoc } from 'firebase/firestore';

export async function GET() {
    try {
        const q = query(collection(db, 'admissions'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const admissions = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
        return NextResponse.json(admissions);
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.json();
        const date = new Date().toISOString().split('T')[0];

        const docRef = await addDoc(collection(db, 'admissions'), {
            ...formData,
            status: 'Pending',
            date: formData.date || date,
            createdAt: new Date().toISOString()
        });

        const newDocSnap = await getDoc(docRef);

        return NextResponse.json({
            success: true,
            id: docRef.id,
            ...newDocSnap.data()
        });
    } catch (error) {
        console.error('Create error:', error);
        return NextResponse.json({ error: 'Failed to submit admission' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, ...updateData } = data;

        const docRef = doc(db, 'admissions', id);
        await updateDoc(docRef, updateData);

        const updatedDocSnap = await getDoc(docRef);

        return NextResponse.json({
            ...updatedDocSnap.data(),
            id: id
        });
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed to update admission' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const docRef = doc(db, 'admissions', id);
        await deleteDoc(docRef);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Failed to delete admission' }, { status: 500 });
    }
}
