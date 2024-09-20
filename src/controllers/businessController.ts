import { Request, Response } from 'express';
import { BusinessService } from "../services/businessService";

export const listBusiness = async (req: Request, res: Response) =>{
    try{
        const users = await BusinessService.listBusiness();
        res.status(200).json(users);
    } catch(error){
        res.status(500).json(error);
    }

}

export const searchBusiness = async (req: Request, res: Response) =>{
    const {idBusiness} = req.query
    if(!idBusiness){
    }
    const id = parseInt(idBusiness as string);
    try{
        const users = await BusinessService.searchBusiness(id);
        res.status(200).json(users);
    } catch(error){
        res.status(500).json(error);
    }
}