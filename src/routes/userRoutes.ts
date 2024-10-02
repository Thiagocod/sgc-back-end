import { Router } from 'express';
import { createUser, showUser, loginUser, protectedUser, listUsers, updateUser, updatePassword, loginUserAdm, protectedUserAdm, searchCpf, searchEmail, deleteUser } from '../controllers/userController';

const router = Router();


router.get('/', showUser);
router.put('/', updateUser)
router.get('/listUsers', listUsers);
router.post('/login', loginUser);
router.get('/check-auth', protectedUser);
router.put('/password', updatePassword);

//user Routes
router.post('/', createUser);
router.get('/cpf', searchCpf);
router.get('/email', searchEmail);
router.delete('/', deleteUser);


//adm routes
router.post('/adm/login', loginUserAdm);
router.get('/adm/check-auth', protectedUserAdm);


export const userRoutes = router;