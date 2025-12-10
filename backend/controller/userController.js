import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const get_dashboard = catchAsync(async (req , res) => {

    const user = req.user;
    const db = req.app.locals.db;

    const [rows] = await db.query(
        `
        SELECT 
            u.user_name AS userName , 
            g.group_name AS groupName , 
            COUNT(t.title) AS totalTask,
            ROUND((SUM(t.status = 'Finish')/COUNT(t.title))*100 , 2) AS totalComplete
        FROM USERS u  
        JOIN  TASK t ON u.user_id = t.user_id
        JOIN GROUP_TASK g ON t.group_id = g.group_id
        WHERE u.user_id = ?
        GROUP BY u.user_name , g.group_name;
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

    const {picId , title , desc , due} = req.body;


    const [result] = await db.query(
            `INSERT INTO 
                ( group_id , created_by , userId , title , task_desc , status , created_at , due_date)
            VALUES( ? , ? , ? , ? , ? , ?  , ? , ?)
            `,
            [groupId , user.user_id , picId ,title , desc , "Prep" , new Date() , due ]
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
        'INSERT INTO MEMBER_OF (user_id , group_id , joined_at) VALUES (? , ? , ?)',
        [user.user_id , groupId , new Date()]
    )

    if(resultInsert.affectedRows === 0){
        throw new AppError("Fail Add Admin" , 400);
    }

    res.status(201).json({success : true , msg : `Successfully create ${groupName}`})

    
})