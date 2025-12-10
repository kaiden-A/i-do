import { Router } from "express";
import { get_logout, post_login, post_signup } from "../controller/authController.js";
import userRoutes from './userRoutes.js';
import requireAuth from '../middleware/requireAuth.js';

const router = Router();

router.post('/login' , post_login);
router.post('/signup' , post_signup);
router.get('/logout' , get_logout);

router.use('/' , requireAuth ,userRoutes );

export default router;