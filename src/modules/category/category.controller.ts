import { Request, Response } from 'express';
import { CategoryService } from './category.service';

const createCategoryController = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.createDBCategory(req.body);
    res.send({
      success: true,
      message: 'Category created successfully!',
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

export const CategoryController = {
  createCategoryController,
};
