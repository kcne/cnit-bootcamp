import prisma from '../prisma';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PaginationOptions, createPaginatedResponse } from '../utils/queryBuilder';
import { PrismaRepositoryService } from './prismaRepositoryService';

type UserFields = 'id' | 'name' | 'email' | 'createdAt';

export class UserService extends PrismaRepositoryService<User, UserFields> {
  constructor() {
    super(prisma, prisma.user);
  }

  async getAllUsers(options: PaginationOptions) {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true
        }
      }),
      prisma.user.count()
    ]);

    return createPaginatedResponse(users, total, { page, limit });
  }

  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id: Number(id) },
    });
  }

  async deleteUser(id: number) {
    return await prisma.user.delete({
      where: { id: Number(id) },
    });
  }

  async register(email: string, password: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword,
        name 
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ 
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true
      }
    });
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password: _, ...userWithoutPassword } = user;
      const token = jwt.sign(
        { userId: user.id }, 
        process.env.JWT_SECRET || 'super_secret_key', 
        { expiresIn: '1h' }
      );
      return { success: true, token, user: userWithoutPassword };
    }
    return { success: false };
  }
}

export const userService = new UserService(); 