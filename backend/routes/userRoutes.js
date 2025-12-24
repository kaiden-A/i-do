import { Router } from "express";
import { 
    add_notes,
    add_task,
    create_group, 
    create_invite, 
    get_dashboard, 
    get_notes, 
    get_task, 
    join_invite, 
    update_task
} from "../controller/userController.js";


const router = Router();

router.get('/' , (req , res) => {
    res.status(200).json({success : true , message : "opening website"})
})

router.get('/tasks' , get_task);
router.post('/tasks/:groupId' , add_task);
router.put('/tasks/:taskId' , update_task);

router.get('/groups' , get_dashboard);
router.post('/groups' , create_group);

router.get('/notes' , get_notes);
router.post('/notes/:groupId' , add_notes );

router.post('/invite/create' , create_invite);
router.post('/invite/join' , join_invite);

export default router;