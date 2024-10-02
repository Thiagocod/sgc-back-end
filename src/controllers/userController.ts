import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { FisicAddressService } from '../services/fisicAddressService';
import { LocationService } from '../services/locationService';
import { dataUser, dataUpdateUser, Password } from '../utils/formatData'
import bcrypt  from 'bcrypt';
import { generateToken, verifyToken } from '../utils/auth';
import { dateNow } from '../utils/dateNow';

// Função para criar um novo usuário
export const createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, cpf, password, cep, address, number, neighborhood, city, region, locLat, locLng} = req.body;
      const data = dataUser({name, email, password, address, number, region, locLat, locLng});
      const {nameUser, emailUser, userPassword, idRegion, createAt, country, numberStreet, street, lng, lat} = await data;
      const idLocation = await LocationService.createLocation({lat, lng, createAt});
      const idAddressFisic = await FisicAddressService.createFisicAddress({cep, city, street, numberStreet, neighborhood, idRegion, country, idLocation, createAt}) ;
      const userId = await UserService.createUser({ nameUser, emailUser, cpf, userPassword, idAddressFisic, createAt });
      res.status(201).json({ id: userId, nameUser, emailUser, userPassword, idAddressFisic, createAt});
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
};

export const listUsers = async (req: Request, res: Response) => {
    try {
      const users = await UserService.listUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
};

export const loginUser = async (req: Request, res: Response) => {
  try{
    const {emailUser, password} = req.body;
    const results = await UserService.loginUser(emailUser);
    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.userPassword);
    if(!isPasswordValid){
      console.log('senha inválida')
      return res.status(401).send('Invalid credentials.');
    }
    if(user.idUser){
        const token =  generateToken(user.idUser);
        const id = user.idUser
        res.json({ token, id});
    }else{
      console.log('id invalido')
      return res.status(401).send('Invalid id');
    }
    console.log('login successful!!!')
  } catch(error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const loginUserAdm = async (req: Request, res: Response) => {
  try{
    const {emailAdmin, password} = req.body;
    const results = await UserService.loginUser(emailAdmin);
    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.userPassword);
    if(!user.adm){
      console.log('usuário não é administrador');
      return res.status(401).send('Admin Invalid')
    }
    if(!isPasswordValid){
      console.log('senha inválida')
      return res.status(401).send('Invalid credentials.');
    }
    if(user.idUser){
        const token =  generateToken(user.idUser);
        const id = user.idUser
        res.json({ token, id});
    }else{
      console.log('id invalido')
      return res.status(401).send('Invalid id');
    }
    console.log('login successful!!!')
  } catch(error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const protectedUser = async (req: Request, res: Response) => {
  try{
    const token = req.headers['authorization'];
    if(!token){
      return res.status(401).send('Access denied.');
    }
    const decoded = verifyToken(token);

    if(!decoded){
      console.log('Invalid token.');
      return res.status(401).send('Invalid token.');
    }
    res.status(200).send('Token válido!');
  } catch(error) {
    res.status(500).json(error);
  }
};

export const protectedUserAdm = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const id = req.headers.id;
  //console.log('token: ', token);
  //console.log('id: ', id)
  try{
    if(!id){
      return null
    }
    const idUser = id.toString()
    const users = await UserService.searchAdm(parseInt(idUser));
    const user = users[0]
    //console.log(user);
    if(user.adm === false || user.adm === null){
      return res.status(401).send('Access denied.');
    }
    if(!token){
      return res.status(401).send('Access denied.');
    }
    const decoded = verifyToken(token);
    if(!decoded){
      console.log('Invalid token.');
      return res.status(401).send('Invalid token.');
    }
    res.status(200).send('Token válido!');
  } catch(error) {
    res.status(500).json(error);
  }
};

export const showUser = async (req: Request, res: Response) => {
  try{
    const {id} = req.query;
    if(id){
      const idUser = id.toString();
      const showUser = await UserService.showUser(parseInt(idUser))
      res.status(200).json(showUser);
    }
  } catch(error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id, idAddressFisic, idLocation, name, email, cep, region, city, neighborhood, street, number, locLat, locLng } = req.body;
  //console.log(id, idAddressFisic, idLocation, name, email, cep, region, city, neighborhood, street, number, locLat, locLng );
  const outData = {idUser: id, idAddressFisic, idLocation, idRegion: region, cep, locLat, locLng};
  const inData = await dataUpdateUser(outData);
  const outDeleteLocation = {removeAt: inData.date, idLocation: inData.idLocation};
  const inDeleteLocation = await LocationService.DeleteLocation(outDeleteLocation);
  //console.log(inDeleteLocation);
  const OutDeleteAddress = {idFisicAddress: inData.idAddressFisic, removeAt: inData.date};
  //console.log(inData);
  const inDeleteAddress = await FisicAddressService.DeleteFisicAddress(OutDeleteAddress);
  //console.log(inDeleteAddress);
  if(!(inDeleteLocation && inDeleteAddress)){
    console.error('Não foi possivel remover dados de localidade')
  }
  try{
    const createLocation = await LocationService.createLocation({lat: inData.lat, lng: inData.lng, createAt: inData.date});
    const createAddressFisic = await FisicAddressService.createFisicAddress({cep, city, street, numberStreet: number, neighborhood, idRegion: inData.idRegion, country: 'Brasil', idLocation: createLocation, createAt: inData.date});
    await UserService.updateUser({emailUser: email, idUser: id, idAddressFisic: createAddressFisic, nameUser: name});
    res.status(200).send('Update successful!')
  }catch{
    return console.error('error ao tentar atualizar usuário.')
  }
}

export const updatePassword = async (req: Request, res: Response) => {
  const {idUser, newPassword} = req.body
  const userPassword = await Password(newPassword);
  try{
    await UserService.updatePassword({idUser, newPassword: userPassword})
    return console.log('senha atualizada com sucesso!')
  }catch (error){
    return console.error(error);
  }
}

export const searchCpf = async (req: Request, res: Response) => {
  const { cpf } = req.query;
  //console.log(cpf)
  if(!cpf){
    return console.error('cpf undefine');
  }
  try{
    const result = await UserService.searchCpf({cpf: cpf.toString()});
    res.status(200).json(result);
  }catch (error){
    return console.error(error);
  }
}

export const searchEmail = async (req: Request, res: Response) =>{
  const { email } = req.query;
  //console.log(email)
  if(!email){
    return console.error('email undefine');
  }
  try{
   const result = await UserService.searchEmail({email: email.toString()});
   res.status(200).json(result);
  }catch (error){
    return console.error(error);
  }
}

export const deleteUser = async (req: Request, res: Response) =>{
  const {id} = req.query;
  const idUser = parseInt(id as string);
  console.log(idUser);
  const date = new Date
  const removeAt = dateNow(date)
  console.log(removeAt);
  if(!idUser || !removeAt){
    return console.error('Error internal!');
  }
  const params = {removeAt, idUser};
  try{
    const result = await UserService.deleteUser(params);
    return res.status(200).send('remove successful!');
  }catch (error){
    return console.error(error);
  }
}