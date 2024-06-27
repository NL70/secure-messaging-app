import prisma from '../app/utils/prisma.mjs'

async function main() {
  // Clear existing data
  await prisma.user.deleteMany();
  
  // Create seed data
  const userData = [
    {
      email: 'alice@prisma.io',
      name: 'Alice',
    },
    {
      email: 'bob@prisma.io',
      name: 'Bob',
    },
    {
      email: 'carol@prisma.io',
      name: 'Carol',
    },
  ];

  for (const user of userData) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log('Seed data created successfully');

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
