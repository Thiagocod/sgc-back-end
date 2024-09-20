export interface NoteProduct {
    idNotesPrice?: number;
    idProduct: number;
    priceProduct: number;
    nameProduct: number;
    nameBusiness: string;
    idUser: number;
    nameUser?: string;
    valor: number;
    comments?: string;
    createAt: Date;
    removeAt?: Date;
}

export interface DeleteNoteProduct{
    idNotesPrice: number;
    removeAt?: Date;
}