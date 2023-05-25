import express, { Router } from 'express';
import ordersController from '../controllers/ordersController';

const router: Router = express.Router();

router.get('/getOrders/:email', ordersController.getOrders);

router.post('/addOrder', ordersController.addOrder);

export default router;
