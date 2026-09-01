import { PrismaClient } from '@prisma/client';
import { loadEnv } from '../src/load-env';

loadEnv();

const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: [
      {
        title: 'Learn TanStack Start',
        description: 'Explore file-based routing and server functions',
        status: 'in-progress',
      },
      {
        title: 'Build NestJS API',
        description: 'Create REST endpoints for tasks',
        status: 'done',
      },
      {
        title: 'Integrate frontend and backend',
        description:
          'Connect TanStack Start with NestJS using server functions',
        status: 'todo',
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
