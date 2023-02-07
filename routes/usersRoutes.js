import express from 'express';
import usersController from '../controllers/usersController.js';

const router = express.Router();

router.get('/getUser/:email', usersController.getUser);

router.get('/getUsers', usersController.getUsers);

router.post('/validateEmail', usersController.validateEmail);

router.post('/addUser', usersController.addUser);

export default router;
