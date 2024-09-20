export interface Business{
    idBusiness?: number;
    nameBusiness: string;
    idAddressFisic: number;
    cnpj?: string;
    partnerBusiness?: boolean;
    createAt: Date;
    removeAt?: Date;
}