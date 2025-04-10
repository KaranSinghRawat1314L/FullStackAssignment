import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {email:'Yuvraj@example.com', password: '123456' },
      {email:'Anamika@example.com', password: 'abcdef' },
      {email:'karan@example.com', password: 'qwerty'},
    ],
  });
  console.log('Seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
