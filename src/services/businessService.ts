import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { Business } from '../models/businessModel';

export class BusinessService {
    static async createBusiness(business: Business): Promise<number>{
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO dbdev.business (idAddressFisic, nameBusiness, createAt) Values(?, ?, ?)',
            [business.idAddressFisic, business.nameBusiness, business.createAt]
        );
        return result.insertId
    }
    static async listBusiness(): Promise<Business[]>{
        const [rows] = await pool.query<Business[] & RowDataPacket[]>('SELECT * FROM dbdev.showbusiness_view');
        return rows
    }
    static async searchBusiness(id: number): Promise<Business[]>{   
        const [rows] = await pool.query<Business[] & RowDataPacket[]>('SELECT * FROM dbdev.showbusiness_view WHERE id = ?', [id]);
        return rows
    }
}