import prisma from '../prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PaginationOptions, getPaginationOptions, createPaginatedResponse } from '../utils/pagination';

export class UserService {
  async getAllUsers(paginationOptions?: PaginationOptions) {
    const { skip, take, page, limit } = getPaginationOptions(paginationOptions);

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take,
        orderBy: {
          id: 'desc'
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

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: { email, password: hashedPassword },
    });
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, 'super_secret_key', { expiresIn: '1h' });
      return { success: true, token, user };
    }
    return { success: false };
  }
}

export const userService = new UserService(); 