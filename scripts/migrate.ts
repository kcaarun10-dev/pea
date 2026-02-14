import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import connectDB from '../src/lib/mongodb';
import Faculty from '../src/models/Faculty';
import Notice from '../src/models/Notice';
import Admission from '../src/models/Admission';
import Gallery from '../src/models/Gallery';
import Setting from '../src/models/Setting';
import Feedback from '../src/models/Feedback';
import Content from '../src/models/Content';

const DATA_DIR = path.join(process.cwd(), 'src/data');

async function migrate() {
    console.log('🚀 Starting migration...');
    await connectDB();

    const files = {
        'faculty.json': Faculty,
        'notices.json': Notice,
        'admissions.json': Admission,
        'gallery.json': Gallery,
        'feedback.json': Feedback,
    };

    // Migrating Standard Collections
    for (const [file, Model] of Object.entries(files)) {
        const filePath = path.join(DATA_DIR, file);
        if (fs.existsSync(filePath)) {
            console.log(`📦 Migrating ${file}...`);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            // Clean data (map 'id' to '_id' for Mongoose if it looks like an ObjectId, otherwise let Mongoose handle it)
            const cleanData = data.map((item: any) => {
                const { id, ...rest } = item;
                // If ID is already a valid MongoDB ObjectId hex string, use it
                if (id && mongoose.Types.ObjectId.isValid(id)) {
                    return { _id: id, ...rest };
                }
                return rest;
            });

            await (Model as any).deleteMany({});
            await (Model as any).insertMany(cleanData);
        }
    }

    // Migrating Settings
    const settingsPath = path.join(DATA_DIR, 'settings.json');
    if (fs.existsSync(settingsPath)) {
        console.log('📦 Migrating settings.json...');
        const settingsData = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        await Setting.deleteMany({});
        await Setting.create(settingsData);
    }

    // Migrating Page Content
    const pageContentFiles = {
        'home.json': 'home',
        'about.json': 'about',
        'academics.json': 'academics',
        'admissions_page.json': 'admissions-page',
    };

    for (const [file, key] of Object.entries(pageContentFiles)) {
        const filePath = path.join(DATA_DIR, file);
        if (fs.existsSync(filePath)) {
            console.log(`📦 Migrating page content: ${file}...`);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            await Content.findOneAndUpdate(
                { key },
                { data },
                { upsert: true }
            );
        }
    }

    console.log('✅ Migration complete!');
    process.exit(0);
}

migrate().catch(err => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
});
