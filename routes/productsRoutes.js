import express from 'express';
import productsController from '../controllers/productsController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get('/getProduct/:id', productsController.getProduct);

router.get('/getProducts', productsController.getProducts);

router.post(
  '/addProduct',
  upload.single('image'),
  productsController.addProduct
);

router.put(
  '/updateProduct',
  upload.single('image'),
  productsController.updateProduct
);

router.delete('/deleteProduct/:id', productsController.deleteProduct);

export default router;
