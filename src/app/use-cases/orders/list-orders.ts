import type { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function listOrders(_: Request, res: Response) {
  try {
    const orders = await Order.find()
      .sort({ createdAt: 1 }) // Sort by creation date in ascending order
      .populate('products.product');

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while fetching orders.',
    });

    console.error('Error fetching order:', error);
  }
}
