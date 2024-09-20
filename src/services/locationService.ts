import pool from '../config/database';
import { Location, DeleteLocation } from '../models/locationModel';
import { ResultSetHeader } from 'mysql2';

export class LocationService {
  // Função para criar um novo latitude e longitude.
  static async createLocation(location: Location): Promise<number> {
    console.log(location);
    const [result] = await pool.query <ResultSetHeader>(
      'INSERT INTO dbdev.locationgeografic (lat, lng, createAt) VALUES (?, ?, ?)',
      [location.lat, location.lng, location.createAt]
    );
    return result.insertId;
  }
  static async DeleteLocation(location: DeleteLocation){
    const [result] = await pool.query(
      'UPDATE dbdev.locationgeografic SET removeAt = ? WHERE idlocation = ?',
      [location.removeAt, location.idLocation]
    );
    return result;
  }

}