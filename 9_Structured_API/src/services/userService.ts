import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';
import createHttpError from 'http-errors';



export const register = async (data: { name: string; email: string; password: string }) => {
  // Check if user already exists with the given email
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });

  if (existingUser) {
    throw createHttpError(400, 'User with this email already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create new user
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  // Exclude password from the returned user data
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const login = async (data: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid credentials');
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  // Exclude password field
  const { password: _, ...userWithoutPassword } = user;

  return { token, user: userWithoutPassword };
};

export const getUserInfoById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return user;
};


