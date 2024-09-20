import pool from '../config/database';
import { Category } from '../models/categoryModel';
import { RowDataPacket } from 'mysql2';

export class CategoryService {
    static async listCategories(): Promise<Category[]>{
        const [rows] = await pool.query<Category[] & RowDataPacket[]>('SELECT * FROM dbdev.categories');
        return rows;
    }
}