import type { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '../../errors/bad-request';
import { Order } from '../../models/Order';

export async function cancelOrder(req: Request, res: Response) {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      throw new BadRequestError(
        'The parameter "orderId" is required to update the order status.',
      );
    }

    if (!isValidObjectId(orderId)) {
      throw new BadRequestError('The parameter "orderId" is invalid.');
    }

    await Order.findByIdAndDelete(orderId);

    res.sendStatus(204);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        error: 'An error occurred while canceling the order.',
      });
    }

    console.error('Error canceling order:', error);
  }
}
