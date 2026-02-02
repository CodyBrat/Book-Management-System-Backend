import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes.js';
import { errorHandler, authMiddleware } from './middlewares/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use('/api/books', bookRoutes);

app.use(errorHandler);

export default app;
