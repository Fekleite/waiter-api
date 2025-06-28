import type { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function listCategories(_: Request, res: Response) {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while fetching categories.',
    });

    console.error('Error fetching category:', error);
  }
}
