import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';

import { createCategory } from './app/use-cases/categories/create-category';
import { listCategories } from './app/use-cases/categories/list-categories';
import { cancelOrder } from './app/use-cases/orders/cancel-order';
import { createOrder } from './app/use-cases/orders/create-order';
import { listOrders } from './app/use-cases/orders/list-orders';
import { updateOrderStatus } from './app/use-cases/orders/update-order-status';
import { createProduct } from './app/use-cases/products/create-product';
import { listProducts } from './app/use-cases/products/list-products';
import { listProductsByCategory } from './app/use-cases/products/list-products-by-category';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, callback) => {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename: (_, file, callback) => {
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.originalname}`;
      callback(null, filename);
    },
  }),
});

router.get('/categories', listCategories);

router.post('/categories', createCategory);

router.get('/products', listProducts);

router.post('/products', upload.single('image'), createProduct);

router.get('/categories/:categoryId/products', listProductsByCategory);

router.get('/orders', listOrders);

router.post('/orders', createOrder);

router.patch('/orders/:orderId', updateOrderStatus);

router.delete('/orders/:orderId', cancelOrder);
