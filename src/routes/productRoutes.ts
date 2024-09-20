import { Router } from 'express';
import { createProduct, listProduct, listUserProductSearch, listProductSearch, listUserProduct, ProductSearch, UpdateProduct, ValidationListProduct, ValidationProductSearch, deleteProduct } from '../controllers/productController';
import { postImage } from '../utils/postImage'


const router = Router();
const upload = postImage();

router.post('/', upload.single('image'), createProduct);
router.delete('/', deleteProduct);
router.get('/', listProduct);
router.get('/user', listUserProduct)
router.put('/', UpdateProduct)
router.get('/search', listProductSearch);
router.get('/user/search', listUserProductSearch)
router.get('/id', ProductSearch);
router.get('/validation', ValidationListProduct);
router.get('/validation/search', ValidationListProduct);
router.get('/validation/id', ValidationProductSearch);

export const productRoutes = router;