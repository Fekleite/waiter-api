import type { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request';
import { Product } from '../../models/Product';

export async function createProduct(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;

    if (!imagePath) {
      throw new Error('An error occurred while uploading the image.');
    }

    const { name, description, ingredients, price, category } = req.body;

    const product = await Product.create({
      name,
      description,
      imagePath,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      price: Number(price),
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        error: 'An error occurred while creating the product.',
      });
    }

    console.error('Error creating product:', error);
  }
}
