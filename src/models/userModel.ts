export interface User {
  idUser?: number;
  nameUser: string;
  emailUser: string;
  adm?: boolean;
  userPassword: string;
  idAddressFisic: number;
  idLocation?: number;
  foneUser?: string;
  foneUserSec?: string;
  cpf: string;
  rg?: string;
  photo?: string;
  createAt: Date;
  removeAt?: Date;
}

export interface ShowUser {
  idUser: number;
  idAddressFisic: number;
  idLocation: number;
  lat: number;
  lng: number;
  nameUser: string;
  emailUser: string;
  password: string;
  cpf: string;
  cep: string; 
  region: string;
  city: string; 
  neighborhood: string; 
  street: string;
  number: string; 
  createAt: Date; 
  removeAt?: Date;
}
export interface UpdateUser{
  idUser: number;
  idAddressFisic: number;
  idLocation?: number;
  nameUser: string;
  emailUser: string;
  cpf?: string;
}

export interface DeleteUser{
  idUser: number;
  removeAt: Date;
}

export interface UpdatePassword{
  idUser: number,
  newPassword: string
}

export interface SearchCPf{
  cpf: string;
}

export interface SearchEmail{
  email:string;
}

export interface DeleteUser{
  idUser: number;
  removeAt: Date;
}