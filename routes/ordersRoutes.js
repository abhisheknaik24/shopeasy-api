import express from 'express';
import ordersController from '../controllers/ordersController.js';

const router = express.Router();

router.get('/getOrder/:id', ordersController.getOrder);

router.get('/getOrders', ordersController.getOrders);

router.post('/addOrder', ordersController.addOrder);

export default router;
