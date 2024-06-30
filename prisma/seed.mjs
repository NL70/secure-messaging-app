import prisma from '../app/utils/prisma.mjs';
import argon2 from 'argon2';

async function main() {
  // Clear existing data
  await prisma.user.deleteMany();
  
  // Create seed data
  const userData = [
    {
      email: 'alice@prisma.io',
      username: 'Alice',
      password: 'aliceisdabest'
    },
    {
      email: 'john@prisma.io',
      username: 'john',
      password: 'johnisthegoat'
    },
    {
      email: 'urmom@prisma.io',
      username: 'yes',
      password: 'hai'
    },
  
  ];

  for (const user of userData) {
    const hashedPassword = await argon2.hash(user.password)
    await prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: hashedPassword,
      }
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
