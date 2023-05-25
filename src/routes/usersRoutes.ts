import express, { Router } from 'express';
import usersController from '../controllers/usersController';

const router: Router = express.Router();

router.get('/getUser/:email', usersController.getUser);

router.get('/getUsers', usersController.getUsers);

router.post('/addAddress', usersController.addAddress);

router.put('/updateAddress', usersController.updateAddress);

export default router;
