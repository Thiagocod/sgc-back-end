import { Router } from "express";
import { listBusiness, searchBusiness } from "../controllers/businessController";


const router = Router();
router.get('/', listBusiness);
router.get('/search', searchBusiness);

export const businessRoutes = router;