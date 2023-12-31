import { Post, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createDBPost = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data: data,
    include: {
      author: true,
      category: true,
    },
  });

  return result;
};

const getAllPosts = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;

  //!Pagination
  const skip = parseInt(limit) * parseInt(page) - parseInt(limit) || 0;
  const take = parseInt(limit) ||10;

  return await prisma.$transaction(async (txt) => {
    const result = await txt.post.findMany({
      skip,
      take,
      include: {
        author: true,
        category: true,
      },
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : { createdAt: 'desc' },

      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            author: {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
    });

    const total = await txt.post.count();

    return { data: result, total };
  });
};

const getSinglePost = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updatePost = async (id: number, payload: Partial<Post>): Promise<Post> => {
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });

  return result;
};

export const PostService = {
  createDBPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
};

//!Pagination

/**
 * limit=5
 * page=3
 *total=10
 *take=limit
 *skip=limit*page -limit
 *     =5*3-5
 *    =10
 * 1 2 3 4 5 6 7 8  10 11 12 13 14 15
 */
