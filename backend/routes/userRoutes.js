import { Router } from "express";
import { create_group } from "../controller/userController";


const router = Router();

router.post('/groups' , create_group);

export default router;