import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.lecture.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();

  // Create test users
  const password = await bcrypt.hash('password123', 10);
  
  const user1 = await prisma.user.create({
    data: {
      email: 'test1@example.com',
      password,
      name: 'Test User 1'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'test2@example.com',
      password,
      name: 'Test User 2'
    }
  });

  // Create 60 lectures (30 for each user)
  const lectureTopics = [
    'JavaScript Basics',
    'TypeScript Fundamentals',
    'React Hooks',
    'Node.js Essentials',
    'Database Design',
    'API Development',
    'Testing Strategies',
    'DevOps Basics',
    'Security Best Practices',
    'Performance Optimization'
  ];

  const createLecturesForUser = async (userId: number) => {
    for (let i = 1; i <= 30; i++) {
      const topic = lectureTopics[Math.floor(Math.random() * lectureTopics.length)];
      await prisma.lecture.create({
        data: {
          name: `${topic} - Lecture ${i}`,
          description: `Detailed coverage of ${topic} with practical examples and exercises.`,
          duration: Math.floor(Math.random() * 120) + 30, // Random duration between 30-150 minutes
          userId
        }
      });
      // Add a small delay to ensure different createdAt timestamps
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  // Seed products
  const productCategories = [
    'Electronics',
    'Books',
    'Clothing',
    'Home & Garden',
    'Sports',
    'Toys',
    'Beauty',
    'Food',
    'Health',
    'Automotive'
  ];

  const productAdjectives = [
    'Premium',
    'Essential',
    'Luxury',
    'Basic',
    'Professional',
    'Elite',
    'Classic',
    'Modern',
    'Eco-friendly',
    'Smart'
  ];

  // Create 120 products
  console.log('Starting to create products...');
  for (let i = 1; i <= 120; i++) {
    const category = productCategories[Math.floor(Math.random() * productCategories.length)];
    const adjective = productAdjectives[Math.floor(Math.random() * productAdjectives.length)];
    
    await prisma.product.create({
      data: {
        name: `${adjective} ${category} Item ${i}`,
        description: `High-quality ${category.toLowerCase()} product with premium features and reliable performance.`,
      }
    });
    if (i % 20 === 0) console.log(`Created ${i} products`);
  }
  console.log('Finished creating products');

  // Create lectures for both users
  await createLecturesForUser(user1.id);
  await createLecturesForUser(user2.id);

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
