import { Request, Response } from 'express';
import Category, { ICategory } from '../models/categories';

const getCategories = async (req: Request, res: Response): Promise<void> => {
  if (req.method === 'GET') {
    const { skip, limit } = req.query;

    try {
      const categories: ICategory[] = await Category.find({ isActive: true })
        .skip(Number(skip))
        .limit(Number(limit));

      res.status(200).json({
        success: true,
        message: 'Categories fetched successfully!',
        data: { categories: categories },
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: String(error),
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Request method is not allowed!',
    });
  }
};

const addCategory = async (req: Request, res: Response): Promise<void> => {
  if (req.method === 'POST') {
    const { name } = req.body;

    if (name) {
      try {
        const category: ICategory = new Category({
          name: name,
        });

        await category.save();

        res.status(200).json({
          success: true,
          message: 'Category added successfully!',
          data: { category: category },
        });
      } catch (error: any) {
        res.status(400).json({
          success: false,
          message: String(error),
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'Request body is missing!',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Request method is not allowed!',
    });
  }
};

export default {
  getCategories,
  addCategory,
};
