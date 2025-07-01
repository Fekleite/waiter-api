import type { Request, Response } from 'express';

import { BadRequestError } from '../../errors/bad-request';
import { Order } from '../../models/Order';

export async function createOrder(req: Request, res: Response) {
  try {
    const { table, products } = req.body;

    if (!table || !products) {
      throw new BadRequestError(
        'Table and products are required to create a order.',
      );
    }

    const order = await Order.create({
      table,
      products,
    });

    res.status(201).json(order);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        error: 'An error occurred while creating the order.',
      });
    }

    console.error('Error creating order:', error);
  }
}
