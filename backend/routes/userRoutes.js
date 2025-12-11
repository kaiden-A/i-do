import { Router } from "express";
import { 
    add_notes,
    add_task,
    create_group, 
    create_invite, 
    get_dashboard, 
    get_notes, 
    get_task, 
    update_task
} from "../controller/userController.js";


const router = Router();

router.get('/tasks' , get_task);
router.post('/tasks/:groupId' , add_task);
router.put('/task/:taskId' , update_task);

router.get('/groups' , get_dashboard);
router.post('/groups' , create_group);

router.get('/notes' , get_notes);
router.post('/notes/:groupId' , add_notes );

router.post('/invite/create' , create_invite)

export default router;