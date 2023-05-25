import express, { Express } from 'express';
import './config';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import morgan from 'morgan';
import './middlewares/passport';
import passport from 'passport';
import authRoutes from './routes/authRoutes';
import usersRoutes from './routes/usersRoutes';
import categoriesRoutes from './routes/categoriesRoutes';
import productsRoutes from './routes/productsRoutes';

const app: Express = express();

const port: string | number = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(express.static('public'));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: process.env.CLIENT_METHODS,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(passport.initialize());

app.use('/api', passport.authenticate('jwt', { session: false }));

app.use('/auth', authRoutes);

app.use('/api/users', usersRoutes);

app.use('/api/categories', categoriesRoutes);

app.use('/api/products', productsRoutes);

(async () => {
  try {
    if (mongoose.connections[0].readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
    }
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error: any) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
})();
