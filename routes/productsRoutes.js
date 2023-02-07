import express from 'express';
import productsController from '../controllers/productsController.js';

const router = express.Router();

router.get('/getProduct/:id', productsController.getProduct);

router.get('/getProducts', productsController.getProducts);

router.post('/addProduct', productsController.addProduct);

router.post('/addProducts', productsController.addProducts);

router.put('/updateProduct', productsController.updateProduct);

router.delete('/deleteProduct/:id', productsController.deleteProduct);

export default router;
