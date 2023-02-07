import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/usersRoutes.js';
import prductsRoutes from './routes/productsRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: process.env.CLIENT_METHODS,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use('/api/users', userRoutes);

app.use('/api/products', prductsRoutes);

app.use('/api/orders', ordersRoutes);

(async () => {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    app.listen(port, () =>
      console.log(`Shopeasy app listening on http://localhost:${port}`)
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
