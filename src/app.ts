import express from 'express';
import path from 'path';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes';
import { productRoutes } from './routes/productRoutes';
import { categoryRoutes } from './routes/categoryRoutes';
import { noteRoutes } from './routes/noteRoutes';
import { businessRoutes } from './routes/businessRoutes';

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, '../images')));
app.use('/api/data/product', productRoutes);
app.use('/api/data/note', noteRoutes);
app.use('/api/data/user',userRoutes);
app.use('/api/data/category', categoryRoutes);
app.use('/api/data/business', businessRoutes);

export default app;