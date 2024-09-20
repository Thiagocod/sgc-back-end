export interface Location{
    idLocation?: number;
    lat: number;
    lng: number;
    createAt: Date;
    removeAt?: Date;
}

export interface DeleteLocation{
    idLocation: number;
    removeAt: Date;
}