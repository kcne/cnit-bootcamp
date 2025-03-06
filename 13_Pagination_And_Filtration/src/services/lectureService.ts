import prisma from '../prisma';
import { Lecture } from '@prisma/client';
import { PrismaRepositoryService } from './prismaRepositoryService';
import { CreateLectureInput } from '../schemas/lectureSchema';
import { PaginatedResult } from '../utils/queryBuilder';
import { QueryOptions } from '../utils/queryBuilder';

type LectureFields = 'id' | 'name' | 'description' | 'duration' | 'createdAt' | 'userId';

export class LectureService extends PrismaRepositoryService<Lecture, LectureFields> {
  constructor() {
    super(prisma, prisma.lecture);
  }

  // Override findAll to include user data when requested
  protected getIncludeOptions(includeUser?: boolean) {
    return includeUser ? {
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      }
    } : undefined;
  }

  // Create lecture with user association
  async createLecture(data: CreateLectureInput, userId: number): Promise<Lecture> {
    return this.create({
      ...data,
      userId
    });
  }

  // Get lectures for a specific user
  async findByUserId(userId: number, options: QueryOptions<LectureFields>): Promise<PaginatedResult<Lecture>> {
    return this.findAll({
      ...options,
      filters: [
        ...(options.filters || []),
        { field: 'userId', operator: 'equals', value: userId }
      ]
    });
  }
}

export const lectureService = new LectureService(); 