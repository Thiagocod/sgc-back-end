import pool from '../config/database';
import { RowDataPacket } from 'mysql2';
import { NoteProduct } from '../models/noteProductsPricesModel';

export class NoteService {
    static async CreateProductNote(note: NoteProduct){
        const [result] = await pool.query(
            'INSERT INTO dbdev.clientnotesproductsprice (idproduct, iduser, valor, comments, createAt  ) Values(?, ?, ?, ?, ?)',
            [note.idProduct, note.idUser, note.valor, note.comments, note.createAt]
        );

        return result
    }
    static async ListProductNotes (id:number): Promise<NoteProduct[]>{
        //console.log('ProductService: ',id)
        const [rows] = await pool.query<NoteProduct[] & RowDataPacket[]>(
            "SELECT * FROM dbdev.note_view  WHERE idproduct = ?;",
            [id]
        );
        return rows
    }

    static async SearchMyNote (idUser: number){
        const [rows] = await pool.query<NoteProduct[] & RowDataPacket[]>(
            "SELECT * FROM dbdev.note_view WHERE iduser = ?;",
            [idUser]
        );
        return rows
    }
    static async SearchMyNoteAndProduct (idUser: number, idProduct: number){
        const [rows] = await pool.query<NoteProduct[] & RowDataPacket[]>(
            "SELECT * FROM dbdev.clientnotesproductsprice WHERE iduser = ? and idproduct = ? and removeAt is null;",
            [idUser, idProduct]
        );
        return rows
    }
    static async DeleteNote(idNote: number, removeAt: Date) {
        const [result] = await pool.query(
            'UPDATE dbdev.clientnotesproductsprice SET removeAt = ? WHERE idNotesPrice = ?',
            [removeAt, idNote]
        );
        return result
    }
}