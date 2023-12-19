
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

// Event listener for beforeExit
process.on('beforeExit', async () => {
    console.log('Closing Prisma client...');
    await Prisma.$disconnect();
    console.log('Prisma client closed.');
});

// Log message when Prisma is connected to the database
Prisma.$connect()
    .then(() => {
        console.log(`Prisma connected to the database with database name: ${Prisma.$database}`);
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

export default Prisma;