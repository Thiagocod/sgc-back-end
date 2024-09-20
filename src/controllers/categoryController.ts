import { Request, Response } from 'express';
import { CategoryService } from '../services/categoryService';

export const listCategories = async (req: Request, res: Response) => {
    try {
      const users = await CategoryService.listCategories();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
}