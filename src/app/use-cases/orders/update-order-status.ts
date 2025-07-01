import type { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '../../errors/bad-request';
import { Order } from '../../models/Order';

const validStatus = ['WAITING', 'IN_PRODUCTION', 'DONE'];

export async function updateOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId) {
      throw new BadRequestError(
        'The parameter "orderId" is required to update the order status.',
      );
    }

    if (!isValidObjectId(orderId)) {
      throw new BadRequestError('The parameter "orderId" is invalid.');
    }

    if (!status) {
      throw new BadRequestError(
        'The "status" field is required to update the order status.',
      );
    }

    if (!validStatus.includes(status)) {
      throw new BadRequestError(
        'The "status" field must be one of the following: WAITING, IN_PRODUCTION, DONE.',
      );
    }

    await Order.findByIdAndUpdate(orderId, {
      status,
    });

    res.sendStatus(204);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        error: 'An error occurred while updating the order status.',
      });
    }

    console.error('Error updating order:', error);
  }
}
