import { dateNow } from '../utils/dateNow';
import { getIdRegion } from '../utils/getIdRegion';
import bcrypt from 'bcrypt';

export interface fUData{
    name: string;
    email: string;
    password:string;
    address: string;
    number: string;
    region: string;
    locLat: string;
    locLng: string;
}

export interface fPData{
    imagePath: string | null,
    price: string;
    locLat: string;
    locLng: string;
    region: string;
}
interface inNote{
    product: string; 
    user: string; 
    note: string;
}

interface InUserUp{
    idUser: string;
    idAddressFisic: string;
    idRegion: string;
    idLocation: string;
    cep: string;
    locLat: string;
    locLng: string;
}
interface OutUserUp{
    idUser: number;
    idAddressFisic: number;
    idRegion: number;
    idLocation: number;
    cep: string;
    date: Date;
    lat: number;
    lng: number;
}
export const dataUser = async ({name, email, password, address, number, region, locLat, locLng}:fUData) => {
    const lat = parseFloat(locLat);
    const lng = parseFloat(locLng);
    const street = address;
    const numberStreet = number;
    const country = "Brasil";
    const idRegion= getIdRegion(region);
    const now = new Date;
    const createAt = dateNow(now);
    const nameUser = name;
    const emailUser = email;
    const userPassword = await bcrypt.hash(password, 10);
    return {
        nameUser,
        emailUser,
        userPassword,
        idRegion,
        createAt,
        country,
        numberStreet,
        street,
        lng,
        lat
    }
}
export const dataProduct = ({imagePath, price, locLat, locLng, region}: fPData) => {
    const lat = parseFloat(locLat);
    const lng = parseFloat(locLng);
    const http = "http://localhost:3001/"
    const priceProduct = parseFloat(price);
    const imageProduct = http + imagePath;
    const country = "Brasil";
    const now = new Date();
    const createAt = dateNow(now);
    const idRegion = getIdRegion(region);
    return {
        priceProduct,
        imageProduct,
        country,
        createAt,
        lng,
        lat,
        idRegion
    }
}

export const dataProductNote = ({product, user, note}: inNote) => {
    const valor = parseFloat(note);
    const idProduct = parseInt(product);
    const idUser = parseInt(user);
    const now = new Date();
    const createAt = dateNow(now);
    return {
        idProduct,
        idUser,
        valor,
        createAt
    }
}

export const dataUpdateUser = (data: InUserUp): Promise<OutUserUp> => {
        const idUser = parseInt(data.idUser);
        const idRegion = getIdRegion(data.idRegion);
        const idAddressFisic = parseInt(data.idAddressFisic);
        const idLocation = parseInt(data.idLocation)
        const cep = data.cep.replace(/\D/g,"");
        const now = new Date();
        const date = dateNow(now);
        const lat = parseFloat(data.locLat);
        const lng = parseFloat(data.locLng);
        const outData: OutUserUp = {idUser, idRegion, idAddressFisic, idLocation, cep, date, lat, lng};
        return Promise.resolve(outData)
}
export const Password = async (newPassword: string) => {
    const password = await bcrypt.hash(newPassword, 10);
    return password
}