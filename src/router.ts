import { Router } from 'express';

export const router = Router();

router.get('/categories', (_, res) => {
  res.status(200).json([
    { id: '1', name: 'Beverages' },
    { id: '2', name: 'Food' },
  ]);
});

router.post('/categories', (_, res) => {
  res.status(201).json({ id: '3', name: 'Desserts' });
});

router.get('/products', (_, res) => {
  res.status(200).json([
    { id: '1', name: 'Pizza' },
    { id: '2', name: 'Burger' },
  ]);
});

router.post('/products', (_, res) => {
  res.status(201).json({ id: '3', name: 'Soda' });
});

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
