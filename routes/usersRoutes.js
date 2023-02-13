import express from 'express';
import usersController from '../controllers/usersController.js';

const router = express.Router();

router.get('/getUser/:email', usersController.getUser);

router.get('/getUsers', usersController.getUsers);

router.post('/validateEmail', usersController.validateEmail);

router.post('/signIn', usersController.signIn);

router.post('/signUp', usersController.signUp);

export default router;
