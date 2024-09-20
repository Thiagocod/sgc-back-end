import pool from '../config/database';
import { FisicAddress, DeleteFisicAddress } from '../models/fisicAddressModel';
import { ResultSetHeader } from 'mysql2';
export class FisicAddressService {
  // Função para criar um novo endereço
  static async createFisicAddress(fisicAddress: FisicAddress): Promise<number> {
    const [result] = await pool.query <ResultSetHeader>(
      'INSERT INTO dbdev.fisicadresses (cep, city, street, numberStreet, neighborhood, idRegion, country, idlocation, createAt) Values(?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [fisicAddress.cep, fisicAddress.city, fisicAddress.street, fisicAddress.numberStreet, fisicAddress.neighborhood, fisicAddress.idRegion, fisicAddress.country, fisicAddress.idLocation, fisicAddress.createAt]
    );
    return result.insertId
  }

  static async DeleteFisicAddress(data: DeleteFisicAddress ){
    try{
      const [result] = await pool.query('UPDATE dbdev.fisicadresses SET removeAt = ? WHERE idAddressFisic = ? ',[data.removeAt, data.idFisicAddress]);
      return result
    }catch(error){
      console.error('Ops!!! algo deu errado ao tentar deletar o endereço', error);
    }
  }
}
