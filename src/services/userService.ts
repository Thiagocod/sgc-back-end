import pool from '../config/database';
import { SearchCPf, SearchEmail, ShowUser, UpdatePassword, UpdateUser, User } from '../models/userModel';
import { RowDataPacket } from 'mysql2';
export class UserService {

  static async createUser(user: User){
    const [result] = await pool.query(
      'INSERT INTO dbdev.users (nameUser, emailUser, CPF,  userPassword, idAddressFisic, createAt) Values(?, ?, ?, ?, ?, ?)',
      [user.nameUser, user.emailUser, user.cpf, user.userPassword, user.idAddressFisic, user.createAt]
    );
  }
  static async listUsers(): Promise<User[]>{
    const [rows] = await pool.query<User[] & RowDataPacket[]>('SELECT * FROM dbdev.users');
    return rows;
  }

  static async loginUser(emailUser: User): Promise<User[]>{
    //console.log(emailUser)
    const [rows] = await pool.query<User[] & RowDataPacket[]>('SELECT * FROM dbdev.users WHERE emailUser = ?',
      [`${emailUser}`]
    );
    return rows
  }
  static async showUser(idUser: number): Promise<ShowUser[]>{
    const [rows] = await pool.query<ShowUser[] & RowDataPacket[]>('SELECT * FROM dbdev.showUser_view WHERE idUser = ?',
      [`${idUser}`]
    );
    return rows
  }
  static async searchAdm(idUser: number): Promise<User[]>{
    const [rows] = await pool.query<User[] & RowDataPacket[]>('SELECT * FROM dbdev.users WHERE idUser = ?',
      [`${idUser}`]
    );
    return rows
  }
  static async updateUser(data: UpdateUser){
    const putUser = await pool.query('UPDATE dbdev.users SET nameUser = ?, emailUser = ?, idAddressFisic = ? WHERE idUser = ? ', [data.nameUser, data.emailUser, data.idAddressFisic, data.idUser])
  }
  static async updatePassword(data: UpdatePassword ){
    const putPassword = await pool.query('UPDATE dbdev.users SET userPassword = ? WHERE idUser = ?', [data.newPassword, data.idUser]);
  }
  static async searchCpf(data: SearchCPf): Promise<User[]>{
    const [rows] = await pool.query<User[] & RowDataPacket[]>('SELECT * FROM dbdev.users WHERE CPF = ?', [data.cpf]);
    return rows
  }
  static async searchEmail(data: SearchEmail): Promise<User[]>{
    const [rows] = await pool.query<User[] & RowDataPacket[]>('SELECT * FROM dbdev.users WHERE emailUser = ?', [data.email]);
    return rows
  }
}