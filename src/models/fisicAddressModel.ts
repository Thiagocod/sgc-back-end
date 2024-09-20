export interface FisicAddress {
    idFisicAddress?: string;
    cep: string;
    city: string;
    street: string;
    numberStreet?: string;
    neighborhood: string;
    idRegion: number;
    country: string;
    idLocation: number;
    createAt: Date;
    removeAt?: Date;
}

export interface DeleteFisicAddress{
    idFisicAddress: number;
    removeAt: Date;
}