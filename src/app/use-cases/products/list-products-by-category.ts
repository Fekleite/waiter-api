import type { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '../../errors/bad-request';
import { Product } from '../../models/Product';

export async function listProductsByCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      throw new BadRequestError('The parameter "categoryId" is required.');
    }

    if (!isValidObjectId(categoryId)) {
      throw new BadRequestError('The parameter "categoryId" is invalid.');
    }

    const products = await Product.find().where('category').equals(categoryId);

    res.status(200).json(products);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        error: 'An error occurred while fetching products.',
      });
    }

    console.error('Error fetching category:', error);
  }
}
