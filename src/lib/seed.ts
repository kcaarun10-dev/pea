import { db } from '../src/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const seedData = async () => {
    console.log('Starting data seed...');

    // 1. Home Page Data
    const homeData = {
        hero: {
            badge: 'Welcome to Excellence',
            title1: 'Empowering',
            titleAccent: 'Future Leaders',
            title2: 'Through Education',
            description: 'Purandhara Everest Academy provides world-class education with a focus on holistic development and academic excellence.',
        },
        stats: [
            { label: 'Students', value: '1500+' },
            { label: 'Teachers', value: '80+' },
            { label: 'Years', value: '25+' },
        ]
    };
    await setDoc(doc(db, 'content', 'home'), homeData);
    console.log('Seeded home data');

    // 2. Academic Page Data
    const academicData = {
        programs: [
            {
                title: 'Science Stream',
                description: 'Comprehensive science education preparing students for medical and engineering fields.',
                features: ['Modern Labs', 'Expert Faculty', 'Research Opportunities']
            },
            {
                title: 'Management Stream',
                description: 'Developing business acumen and leadership skills for future entrepreneurs.',
                features: ['Practical Workshops', 'Industry Visits', 'Case Studies']
            }
        ]
    };
    await setDoc(doc(db, 'content', 'academics'), academicData);
    console.log('Seeded academic data');

    // 3. About Page Data
    const aboutData = {
        mission: 'To provide quality education that empowers students to become responsible global citizens.',
        vision: 'To be a leading institution recognized for academic excellence and holistic development.',
        history: 'Established in 1998, PEA has grown from a small school to a premier educational institution.',
        principalMessage: {
            name: 'Dr. Principal Name',
            message: 'Welcome to PEA, where we believe in nurturing every child\'s potential.',
            image: 'https://placehold.co/400x400'
        }
    };
    await setDoc(doc(db, 'content', 'about'), aboutData);
    console.log('Seeded about data');

    // 4. Admissions Page Data
    const admissionsPageData = {
        process: [
            { step: 1, title: 'Inquiry', description: 'Fill out the inquiry form or visit our office.' },
            { step: 2, title: 'Entrance Exam', description: 'Appear for the entrance examination on scheduled date.' },
            { step: 3, title: 'Interview', description: 'Personal interview with the admission committee.' },
            { step: 4, title: 'Enrollment', description: 'Submit documents and pay fees to confirm admission.' }
        ],
        requirements: ['Mark sheet of previous class', 'Transfer Certificate', 'Citizenship Copy', 'Photos'],
        deadlines: {
            applicationStart: '2024-04-01',
            applicationEnd: '2024-05-30',
            examDate: '2024-06-05'
        }
    };
    await setDoc(doc(db, 'content', 'admissions-page'), admissionsPageData);
    console.log('Seeded admissions page data');

    // 5. Site Settings
    const settingsData = {
        general: {
            schoolName: 'Purandhara Everest Academy',
            address: 'Jorpati, Kathmandu',
            phone: '+977-1-4912345',
            email: 'info@pea.edu.np',
            logo: 'https://placehold.co/200x200',
        },
        socialParams: {
            facebook: 'https://facebook.com/pea',
            instagram: 'https://instagram.com/pea',
            twitter: 'https://twitter.com/pea',
            youtube: 'https://youtube.com/pea'
        },
        leadership: [
            { name: 'John Doe', role: 'Chairman', bio: 'Visionary leader...', image: 'https://placehold.co/300x300', fb: '' },
            { name: 'Jane Smith', role: 'Principal', bio: 'Academic expert...', image: 'https://placehold.co/300x300', fb: '' }
        ]
    };
    await setDoc(doc(db, 'settings', 'general'), settingsData);
    console.log('Seeded settings data');

    console.log('Data seeding completed successfully!');
};

// To run this, we need a way to execute it in the Next.js environment.
// For now, we'll expose a temporary API route to trigger this.
export default seedData;
