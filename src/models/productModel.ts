export interface Product{
    idProduct?: number;
    idUser: number;
    idbusiness?: number;
    priceProduct?: number;
    nameProduct?: string;
    idCategory: number;
    mark: string;
    weight: string;
    imageProduct: string;
    expirationPrice?:Date;
    createAt: Date;
    removeAt?: Date;
}
export interface GetProductSearch{
    search: string;
    latFirst: number;
    lng: number;
    latSec: number;
    radian: number;
    dateNow?: string
}

export interface ProductSearch {
    id: number;
    idUser: number;
    nameProduct: string;
    price: number;
    category: string;
    mark: string;
    weight: string;
    imageProduct: string;
    idBusiness: number;
    business: string;
    idAddress: number;
    street: string;
    numberStreet: string;
    neighborhood: string;
    city: string;
    idRegion: number;
    cep: string;
    idLocation: number;
    lat: number;
    lng: number;
    expirationPrice: Date; 
    createAt: Date;
}
export interface UpdateProduct{
    id: number;
    price: number;
    nameProduct: string;
    idCategory: number;
    mark: string;
    weight: string;
    expirationPrice: Date;
    approved: boolean | null;
}

export interface DeleteProduct{
    id: number;
    removeAt: Date;
}

export interface GetUserProductSearch{
    idUser: number;
    search: string;
}