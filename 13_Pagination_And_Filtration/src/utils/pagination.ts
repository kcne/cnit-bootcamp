export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

export function getPaginationOptions(options?: PaginationOptions) {
  const page = Math.max(options?.page || DEFAULT_PAGE, 1);
  const limit = Math.max(options?.limit || DEFAULT_LIMIT, 1);
  const skip = (page - 1) * limit;

  return {
    skip,
    take: limit,
    page,
    limit,
  };
}

export async function createPaginatedResponse<T>(
  data: T[],
  total: number,
  options: PaginationOptions
): Promise<PaginatedResult<T>> {
  const page = options.page || DEFAULT_PAGE;
  const limit = options.limit || DEFAULT_LIMIT;
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    metadata: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
} 