import type { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request';
import { Category } from '../../models/Category';

export async function createCategory(req: Request, res: Response) {
  try {
    const { name, icon } = req.body;

    if (!name || !icon) {
      throw new BadRequestError(
        'Name and icon are required to create a category.',
      );
    }

    const category = await Category.create({
      name,
      icon,
    });

    res.status(201).json(category);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        error: 'An error occurred while creating the category.',
      });
    }

    console.error('Error creating category:', error);
  }
}
