import { Category, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createDBCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data: data,
  });

  return result;
};

export const CategoryService = {
  createDBCategory,
};
