import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import { createCategory } from './app/use-cases/categories/create-category';
import { listCategories } from './app/use-cases/categories/list-categories';
import { createProduct } from './app/use-cases/products/create-product';
import { listProducts } from './app/use-cases/products/list-products';

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

router.get('/categories/:categoryId/products', (_, res) => {
  res.status(200).json([
    { id: '1', name: 'Pizza' },
    { id: '2', name: 'Burger' },
  ]);
});

router.get('/orders', (_, res) => {
  res.status(200).json([
    { id: '1', table: '1', products: [{ product: '1', quantity: 2 }] },
    { id: '2', table: '2', products: [{ product: '2', quantity: 1 }] },
  ]);
});

router.post('/orders', (_, res) => {
  res.status(201).json({
    id: '1',
    table: '1',
    products: [{ product: '1', quantity: 2 }],
  });
});

router.patch('/orders/:orderId', (_, res) => {
  res.status(200).json({
    status: 'IN_PRODUCTION',
  });
});

router.delete('/orders/:orderId', (_, res) => {
  res.status(204).send();
});
