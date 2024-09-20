import { Request, Response } from 'express';
import { LocationService } from '../services/locationService';
import { FisicAddressService } from '../services/fisicAddressService';
import { ProductService } from '../services/productService';
import path from "path";
import { BusinessService } from '../services/businessService';
import { dataProduct} from '../utils/formatData';
import { dateNow } from '../utils/dateNow';
import { dateNowPrice } from '../utils/dateNowPrice';


export const createProduct = async (req: Request, res: Response) =>{
    try{
        const { id, nameProduct, idCategory, price, mark, weight, idBusiness, nameBusiness, cep, street, numberStreet, city, neighborhood, region, expirationPrice, locLat, locLng  } = req.body;
        //console.log("chegando: ", id, nameProduct, idCategory, price, mark, weight, nameBusiness, cep, street, numberStreet, city, neighborhood, region, expirationPrice, locLat, locLng )
        const imagePath = req.file ? path.posix.join('images', req.file.filename) : null;
        const data = dataProduct({imagePath, price, locLat, locLng, region});
        //console.log(data);
        const { priceProduct, imageProduct, country, createAt, lng, lat, idRegion } = data
        //console.log(priceProduct, imageProduct, country, createAt, lng, lat, idRegion)
        if(!id){
            console.error('Sem id')
            return
        }
        const idUser =  parseInt(id as string) ;
        const idLocation = await LocationService.createLocation({ lat, lng, createAt });
        //console.log('Location: ', idLocation);
        const idAddressFisic = await FisicAddressService.createFisicAddress({ cep, city, street, numberStreet, neighborhood, idRegion, country, idLocation, createAt });
        if(!idBusiness || idBusiness === '0'){
            const idbusiness = await BusinessService.createBusiness({idAddressFisic, nameBusiness,createAt});
            const idProduct = await ProductService.createProduct({ idUser, priceProduct, nameProduct, idbusiness, idCategory, mark, weight,  imageProduct, expirationPrice, createAt });
            res.status(201).json({ id: idProduct, idUser, priceProduct, nameProduct, idbusiness, idCategory, mark, weight,  imageProduct, expirationPrice, createAt });
        }else{
            const idbusiness = parseInt(idBusiness as string);
            const idProduct = await ProductService.createProduct({ idUser, priceProduct, nameProduct, idbusiness, idCategory, mark, weight,  imageProduct, expirationPrice, createAt });
            res.status(201).json({ id: idProduct, idUser, priceProduct, nameProduct, idbusiness, idCategory, mark, weight,  imageProduct, expirationPrice, createAt });  
        }
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}
export const listProduct = async (req: Request, res: Response) =>{
    const date = new Date;
    const now = dateNowPrice(date)
    //console.log(now);
    try{
        const users = await ProductService.ListProduct(now);
        res.status(200).json(users);
    } catch(error){
        res.status(500).json(error);
    }

}

export const listProductSearch = async (req: Request, res: Response) =>{
    const {fSearch, distance} = req.query;
    const date = new Date;
    const now = dateNowPrice(date)
    //console.log(now);
    //console.log(fSearch, distance);
    if(fSearch){
        const radian = parseInt(distance as string);
        const search = fSearch.toString();
        // Enquanto o auth não é definido. 
        const latFirst = -25.4829;
        const latSec = -25.4829;
        const lng = -49.1529;
        // Fim
        try{
            const users = await ProductService.ListProductSearch({search, latFirst, lng, latSec, radian, dateNow: now});
            res.status(200).json(users);
        } catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }
}
export const ProductSearch = async (req: Request, res: Response) =>{
    const {productId} = req.query;
    //console.log('productController: ', productId);
    if(productId){
        const id = parseInt(productId as string);
        try{
            const product = await ProductService.ProductSearch(id);
            res.status(200).json(product);
        } catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }
}

export const UpdateProduct = async (req: Request, res: Response) =>{
    const { id, nameProduct, valor, idCategory, mark, weight, expirationPrice, validation } = req.body;
    const price = parseFloat(valor);
    let approved = null
    if(validation == "Aprovado"){
       approved = true; 
    } else if ( validation == "Reprovado") {
        approved = false;
    }
    try{    
        //console.log("chegando: ", id, nameProduct, price, idCategory, mark, weight, expirationPrice, approved );
        const putProduct = await ProductService.UpdateProduct({ nameProduct, price, idCategory, mark, weight, expirationPrice, approved, id });
        res.status(201).json({ id: id, nameProduct, price,  idCategory, mark, weight, expirationPrice, approved });
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

export const ValidationListProductSearch = async (req: Request, res: Response) =>{
    const {fSearch, distance} = req.query;
    const date = new Date;
    const now = dateNow(date)
    //console.log(fSearch, distance);
    if(fSearch){
        const radian = parseInt(distance as string);
        const search = fSearch.toString();
        // Enquanto o auth não é definido. 
        const latFirst = -25.4829;
        const latSec = -25.4829;
        const lng = -49.1529;
        // Fim
        try{
            const users = await ProductService.ValidationListProductSearch({search, latFirst, lng, latSec, radian});
            res.status(200).json(users);
        } catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }
}

export const ValidationListProduct = async (req: Request, res: Response) =>{
    try{
        const users = await ProductService.ValidationListProduct();
        res.status(200).json(users);
    } catch(error){
        res.status(500).json(error);
    }

}

export const ValidationProductSearch = async (req: Request, res: Response) =>{
    const {productId} = req.query;
    //console.log('productController: ', productId);
    if(productId){
        const id = parseInt(productId as string);
        try{
            const product = await ProductService.ValidationProductSearch(id);
            res.status(200).json(product);
        } catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }
}

export const listUserProductSearch = async (req: Request, res: Response) =>{
    const {idUser,search} = req.query;
    if(search){
        const id = parseInt(idUser as string);
        try{
            const users = await ProductService.ListUserProductSearch({idUser: id, search: search as string});
            res.status(200).json(users);
        } catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }
}

export const listUserProduct = async (req: Request, res: Response) =>{
    const {idUser} = req.query;
    const id = parseInt(idUser as string);
    try{
        const users = await ProductService.ListUserProduct(id);
        res.status(200).json(users);
    } catch(error){
        res.status(500).json(error);
    }

}

export const deleteProduct = async (req: Request, res: Response) =>{
    const {idProduct} = req.query;
    const now = new Date;
    const removeAt = dateNow(now);
    try{
        const result = await ProductService.DeleteProduct(parseInt(idProduct as string), removeAt);
        res.status(200).json(result);
    } catch(error){
        res.status(500).json(error);
    }

}