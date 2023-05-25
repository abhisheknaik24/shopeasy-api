import express, { Router } from 'express';
import productsController from '../controllers/productsController';
import upload from '../middlewares/upload';

const router: Router = express.Router();

router.get('/getProduct/:id', productsController.getProduct);

router.get('/getProducts', productsController.getProducts);

router.post('/filterProducts', productsController.filterProducts);

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
