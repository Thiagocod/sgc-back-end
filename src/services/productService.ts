import pool from '../config/database';
import { RowDataPacket } from 'mysql2';
import { Product, GetProductSearch, ProductSearch, UpdateProduct, GetUserProductSearch } from '../models/productModel';
import { NoteProduct } from '../models/noteProductsPricesModel';

export class ProductService {
    static async createProduct(product: Product){
        const [result] = await pool.query(
            'INSERT INTO dbdev.products (idUser, priceProduct, nameProduct, idbusiness, idCategory, mark, weight, imageProduct, expirationPrice, createAt  ) Values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [product.idUser, product.priceProduct, product.nameProduct, product.idbusiness, product.idCategory, product.mark, product.weight, product.imageProduct, product.expirationPrice, product.createAt]
        );
    }
    static async ListProduct(now: string): Promise<Product[]>{
            const [rows] = await pool.query<Product[] & RowDataPacket[]>(
                "SELECT pv.* FROM dbdev.product_view pv INNER JOIN dbdev.products p on p.idproduct = pv.id WHERE pv.approved is true and pv.removeAt is null and p.expirationPrice >= ? ORDER BY pv.createAt DESC, price ASC;", [`${now}`]
                );
            return rows
    }
    static async ListProductSearch(search: GetProductSearch): Promise<ProductSearch[]>{
        const [rows] = await pool.query<ProductSearch[] & RowDataPacket[]>(
            "SELECT pv.* FROM dbdev.product_view pv INNER JOIN dbdev.products p ON p.idproduct = pv.id WHERE pv.nameProduct like ?  and ( 6371 * acos(cos(radians(?)) * cos(radians(pv.lat)) * cos(radians(pv.lng) - radians(?)) + sin(radians(?)) * sin(radians(pv.lat))) <= ?) and pv.approved is true and pv.removeAt is null and p.expirationPrice >= ? ORDER BY pv.createAt DESC, pv.price ASC;",
            [`%${search.search}%`, search.latFirst, search.lng, search.latSec, search.radian, `${search.dateNow}`]
        );
        return rows
    }
    static async ProductSearch(id: number): Promise<ProductSearch[]>{
        //console.log('ProductService: ',id)
        const [rows] = await pool.query<ProductSearch[] & RowDataPacket[]>(
            "SELECT * FROM dbdev.product_view WHERE id = ? and approved is true and removeAt is null;",
            [id]
        );
        return rows
    }
    static async ListProductNotes (id:number): Promise<NoteProduct[]>{
        //console.log('ProductService: ',id)
        const [rows] = await pool.query<NoteProduct[] & RowDataPacket[]>(
            "SELECT * FROM dbdev.note_view  WHERE idproduct = ?;",
            [id]
        );
        return rows
    }
    static async CreateProductNote(note: NoteProduct){
        const [result] = await pool.query(
            'INSERT INTO dbdev.clientnotesproductsprice (idproduct, iduser, valor, comments, createAt  ) Values(?, ?, ?, ?, ?)',
            [note.idProduct, note.idUser, note.valor, note.comments, note.createAt]
        );
    }
    static async UpdateProduct(product: UpdateProduct){
        const [result] = await pool.query(
            'UPDATE dbdev.products SET nameProduct = ?, priceProduct = ?, idCategory = ?, mark = ?, weight = ?, expirationPrice = ?, approved = ? WHERE idProduct = ?',
            [product.nameProduct, product.price, product.idCategory, product.mark, product.weight, product.expirationPrice, product.approved, product.id]
        );
    }

    static async ValidationListProduct(): Promise<Product[]>{
        const [rows] = await pool.query<Product[] & RowDataPacket[]>(
            "SELECT * FROM dbdev.product_view WHERE approved is null ORDER BY createAt DESC;"
        );
        return rows
    }
    static async ValidationListProductSearch(search: GetProductSearch): Promise<ProductSearch[]>{
        const [rows] = await pool.query<ProductSearch[] & RowDataPacket[]>(
            "SELECT * FROM dbdev.product_view WHERE nameProduct like ? and ( 6371 * acos(cos(radians(?)) * cos(radians(product_view.lat)) * cos(radians(product_view.lng) - radians(?)) + sin(radians(?)) * sin(radians(product_view.lat))) <= ?) and approved is null ORDER BY createAt DESC, price ASC;",
            [`%${search.search}%`, search.latFirst, search.lng, search.latSec, search.radian]
        );
        return rows
    }
    static async ValidationProductSearch(id: number): Promise<ProductSearch[]>{
    //console.log('ProductService: ',id)
    const [rows] = await pool.query<ProductSearch[] & RowDataPacket[]>(
        "SELECT * FROM dbdev.product_view WHERE id = ? and approved is null;",
        [id]
    );
    return rows
    }
    static async ListUserProductSearch(search: GetUserProductSearch): Promise<ProductSearch[]>{
        const [rows] = await pool.query<ProductSearch[] & RowDataPacket[]>(
            "SELECT * FROM dbdev.product_view WHERE nameProduct like ? and iduser = ? and approved is true and removeAt is null ORDER BY createAt DESC, price ASC;",
            [`%${search.search}%`, search.idUser]
        );
        return rows
    }
    static async ListUserProduct(id: number): Promise<Product[]>{
        const [rows] = await pool.query<Product[] & RowDataPacket[]>(
            "SELECT * FROM dbdev.product_view WHERE idUser = ? and approved is true and removeAt is null ORDER BY createAt DESC, price ASC;",
            [id]
        );
        return rows
    }
    static async DeleteProduct(idProduct: number, removeAt: Date){
        const [result] = await pool.query('UPDATE dbdev.products SET removeAt = ? WHERE idproduct = ?',
            [removeAt, idProduct]);
        return result
    }
}