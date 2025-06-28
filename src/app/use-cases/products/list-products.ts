import type { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function listProducts(_: Request, res: Response) {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while fetching products.',
    });

    console.error('Error fetching category:', error);
  }
}
