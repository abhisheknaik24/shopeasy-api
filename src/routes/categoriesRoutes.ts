import express, { Router } from 'express';
import categoriesController from '../controllers/categoriesController';

const router: Router = express.Router();

router.get('/getCategories', categoriesController.getCategories);

router.post('/addCategory', categoriesController.addCategory);

export default router;
