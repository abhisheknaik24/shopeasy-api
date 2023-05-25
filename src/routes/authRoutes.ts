import express, { Request, Response, Router } from 'express';
import passport from 'passport';
import authController from '../controllers/authController';

const router: Router = express.Router();

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/',
  }),
  (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: 'User logged in successfully!',
      data: { token: req.user },
    });
  }
);

router.post('/signIn', authController.signIn);

router.post('/signUp', authController.signUp);

router.post('/validateEmail', authController.validateEmail);

export default router;
