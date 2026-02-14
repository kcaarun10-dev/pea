import seedData from '../src/lib/seed';

async function main() {
    try {
        await seedData();
        console.log('Seeding completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

main();
