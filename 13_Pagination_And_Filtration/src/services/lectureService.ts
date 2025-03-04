import prisma from '../prisma';
import { PaginationOptions, getPaginationOptions, createPaginatedResponse } from '../utils/pagination';

export class LectureService {
  async createLecture(name: string, description: string, duration: number, userId: number) {
    return await prisma.lecture.create({
      data: {
        name,
        description,
        duration: Number(duration),
        userId
      },
    });
  }

  async getAllLectures(paginationOptions?: PaginationOptions) {
    
    const { skip, take, page, limit } = getPaginationOptions(paginationOptions);

    const [lectures, total] = await Promise.all([
      prisma.lecture.findMany({
        skip,
        take,
        orderBy: {
          id: 'desc'
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true
            }
          }
        }
      }),
      prisma.lecture.count()
    ]);

    console.log('Found total lectures:', lectures.length);

    return createPaginatedResponse(lectures, total, { page, limit });
  }

  async getMyLectures(userId: number, paginationOptions?: PaginationOptions) {
    console.log('Fetching lectures for user:', userId);
    
    const { skip, take, page, limit } = getPaginationOptions(paginationOptions);

    const [lectures, total] = await Promise.all([
      prisma.lecture.findMany({
        where: {
          userId: userId
        },
        skip,
        take,
        orderBy: {
          id: 'desc'
        }
      }),
      prisma.lecture.count({
        where: {
          userId: userId
        }
      })
    ]);

    console.log('Found user lectures:', lectures.length, 'Total:', total);

    return createPaginatedResponse(lectures, total, { page, limit });
  }

  async getLectureById(id: number) {
    return await prisma.lecture.findUnique({
      where: { id: Number(id) },
    });
  }

  async deleteLecture(id: number) {
    return await prisma.lecture.delete({
      where: { id: Number(id) },
    });
  }
}

export const lectureService = new LectureService(); 