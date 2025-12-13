import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import crypto from 'crypto';

export const get_dashboard = catchAsync(async (req , res) => {

    const user = req.user;
    const db = req.app.locals.db;

    const [rows] = await db.query(
        `
        SELECT 
            u.user_name AS userName,
            g.group_name AS groupName,
            COUNT(t.title) AS totalTask,
            COALESCE(
                ROUND(
                    (SUM(CASE WHEN t.status = 'Finish' THEN 1 ELSE 0 END) /
                    NULLIF(COUNT(t.title), 0)) * 100,
                2),
            0) AS totalComplete
        FROM USERS u
        JOIN MEMBERS m ON u.user_id = m.user_id    
        JOIN GROUP_TASK g ON m.group_id = g.group_id    
        LEFT JOIN TASK t ON g.group_id = t.group_id     
        WHERE u.user_id = ?
        GROUP BY u.user_name, g.group_name;
        `,
        [user.user_id]
    )

    res.status(200).json({groupSummary: rows });

})

export const get_task = catchAsync(async (req , res) => {

    const user = req.user;
    const db = req.app.locals.db;


    const [rows] = await db.query(
        `
        SELECT 
            u.user_name AS userName , 
            g.group_name AS groupName , 
            t.title  AS task, 
            t.task_desc AS taskDesc , 
            t.status AS status, 
            DATE_FORMAT(t.due_date , '%b %d %Y') AS dueDate
        FROM USERS u  
        JOIN  TASK t ON u.user_id = t.user_id
        JOIN GROUP_TASK g ON t.group_id = g.group_id
        WHERE g.group_id IN (SELECT group_id FROM MEMBERS WHERE user_id = ?)
        `,
        [user.user_id]
    );

    const result = rows.reduce((acc, item) => {
        if (!acc[item.groupName]) acc[item.groupName] = [];
        acc[item.groupName].push(item);
        return acc;
    }, {});

    res.status(200).json({ userData : result});

})

export const add_task = catchAsync( async (req , res) => {

    const user = req.user;
    const groupId = req.params.groupId;
    const db = req.app.locals.db;

    const {picId , title , desc , due} = req.body;

    const status = "Prep"
    const [result] = await db.query(
            `INSERT INTO TASK 
                ( group_id , created_by , user_id , title , task_desc , status , created_at , due_date)
            VALUES( ? , ? , ? , ? , ? , ?  , ? , ?)
            `,
            [groupId , user.user_id , picId ,title , desc , status , new Date() , due ]
    );

    if(result.affectedRows === 0){
        throw new AppError("Fail Creating The Task" , 400);
    }

    res.status(201).json({success : true , msg : 'Successfully Created The Task'});


})


export const create_group = catchAsync( async (req , res) => {

    const user = req.user;
    const db = req.app.locals.db;
    const {groupName} = req.body;

    

    const [result] = await db.query(
        'INSERT INTO GROUP_TASK(group_name , group_admin) VALUES(? , ?)',
        [groupName , user.user_id]
    )

    if(result.affectedRows === 0){
        return res.status(401).json({error : true , msg : 'Fail creating the group'});
    }

    const groupId = result.insertId;

    const [resultInsert] = await db.query(
        'INSERT INTO MEMBERS (user_id , group_id , joined_at) VALUES (? , ? , ?)',
        [user.user_id , groupId , new Date()]
    )

    if(resultInsert.affectedRows === 0){
        throw new AppError("Fail Add Admin" , 400);
    }

    res.status(201).json({success : true , msg : `Successfully create ${groupName}`})

    
})

export const get_notes = catchAsync( async(req , res) => {
    
    const user = req.user;
    const db = req.app.locals.db;

    const [rows] = await db.query(
        `
        SELECT 
            g.group_name AS groupName , 
            n.note_types  AS types, 
            n.note_details AS details 
        FROM NOTES n JOIN GROUP_TASK g ON g.group_id = n.group_id
        WHERE g.group_id  IN ( SELECT group_id FROM members WHERE user_id = ?);
        `,
        [user.user_id]
    )

    const result = rows.reduce((acc, item) => {
        if (!acc[item.groupName]) acc[item.groupName] = [];
        acc[item.groupName].push(item);
        return acc;
    }, {});

    res.status(200).json({success : true , notes : result})

} )

export const add_notes = catchAsync( async(req , res) => {

    const groupId = req.params.groupId;
    const db = req.app.locals.db;
    const {noteTypes , noteDetails} = req.body;

    const [result] = await db.query(
        `
        INSERT INTO NOTES (group_id , note_types , note_details)
        VALUES(? , ? , ?)
        `,
        [groupId , noteTypes , noteDetails]
    );

    if(result.affectedRows === 0){
        throw new AppError("Fail Add Data" , 400)
    }

    const noteId = result.insertId;

    const [rows] = await db.query(
        `
        SELECT 
            g.group_name AS groupName , 
            n.note_types AS types , 
            n.note_details AS details 
        FROM NOTES n JOIN GROUP_TASK g ON g.group_id = n.group_id
        WHERE note_id = ?;
        `,
        [noteId]
    )

    if(rows.length === 0){
        throw new AppError('notes not found' , 404)
    }

    res.status(201).json({success : true , message : "Successfully Add Notes" , data : rows[0]})

})

export const update_task = catchAsync( async(req , res) => {


    const db = req.app.locals.db;
    const taskId = req.params.taskId;

    const {status} = req.body;

    const [result] = await db.query(
        `
        UPDATE TASK
        SET STATUS = ?
        WHERE TASK_ID = ?
        `,
        [status , taskId]
    )

    if(result.affectedRows === 0){
        throw new AppError('Fail Updated the status' , 400)
    }

    res.status(201).json({success : true , message : 'successfully change the status'})
})

export const create_invite = catchAsync( async(req , res) => {

    const db = req.app.locals.db;

    const { groupId } = req.body;

    const inviteToken = crypto.randomBytes(10).toString("hex"); 
    const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); 

    const [result] = await db.query(
        `
        INSERT INTO INVITES (group_id , invite_token , expires_at)
        VALUES(? , ? , ?)
        `,
        [groupId , inviteToken , expiresAt]
    )

    if(result.affectedRows === 0){
        throw new AppError('Fail Creating invites Link' , 400)
    }

    const joinLink = `${process.env.FRONTEND_URL}/join/${groupId}/${inviteToken}`;

    res.status(201).json({success : true , inviteLink : joinLink})

})

export const join_invite = catchAsync( async(req , res) => {
    
})