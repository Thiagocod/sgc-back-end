import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { dataProductNote } from '../utils/formatData';
import { NoteService } from '../services/noteServices';
import { dateNow } from '../utils/dateNow';

export const createNote = async (req: Request, res: Response) =>{
    try{
        const {product, user, note, comments} = req.body;
        //console.log("Chegada no Controller: ", product, user, note, comments);
        const data = dataProductNote({product, user, note});
        //console.log("Tratamento de dados ", data);
        const { idProduct, idUser, valor, createAt} = data;
        //console.log("Depois de colocar nas variaveis: ", idProduct, idUser, valor, createAt )
        const idProductNote = await ProductService.CreateProductNote({
            idProduct, idUser, valor, comments, createAt,
            priceProduct: 0,
            nameProduct: 0,
            nameBusiness: ''
        });
        res.status(201).json({ id: idProductNote, idProduct, idUser, valor, comments, createAt});
    } catch(error){+
        console.log(error);
        res.status(500).json(error);
    }
}
export const ListNotes = async (req: Request, res: Response) =>{
    const {productId} = req.query;
    //console.log('productController: ', productId);
    if(productId){
        const id = parseInt(productId as string);
        //console.log(id);
        try{
            const product = await ProductService.ListProductNotes(id);
            res.status(200).json(product);
        } catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }
}

export const SearchMyNote = async (req: Request, res: Response) =>{
    const {id} = req.query;
    if(id){
        const idUser = parseInt(id as string)
        try{
            const note = await NoteService.SearchMyNote(idUser);
            res.status(200).json(note);
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }
}
export const SearchMyNoteAndProduct = async (req: Request, res: Response) =>{
    const {id, idproduct} = req.query;
    if(id){
        const idUser = parseInt(id as string);
        if(idproduct){
            const idProduct = parseInt(idproduct as string);
            try{
                const note = await NoteService.SearchMyNoteAndProduct(idUser, idProduct);
                res.status(200).json(note);
            }catch(error){
                console.log(error);
                res.status(500).json(error);
            }
        }
    }
}
    
export const DeleteNote = async (req: Request, res: Response) =>{
    const {id} = req.query;
    const now = new Date;
    const removeAt = dateNow(now);
    if(id && removeAt){
        const idNote = parseInt(id as string);
        try{
            const DeleteNote = await NoteService.DeleteNote(idNote, removeAt);
            res.status(200).send('nota removida com sucesso!');
        }catch(error){
            console.log(error);
            res.status(500).send('error ao tentar remover nota');
        }
    }
}
