import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';
import pool from "../database/database.js";

export const get_dashboard = catchAsync(async (req , res) => {

    const user = req.user;
     

    const [rows] = await pool.query(
        `
        SELECT 
            u.user_name AS userName,
            g.group_name AS groupName,
            g.group_desc AS groupDesc,
            COUNT(t.title) AS totalTask,
            COALESCE(ROUND(
                (SUM(CASE WHEN t.status = 'finish' THEN 1 ELSE 0 END) / NULLIF(COUNT(t.title), 0)) * 100
            , 2), 0) AS totalComplete,
            (SELECT COUNT(*) FROM MEMBERS m2 WHERE m2.group_id = g.group_id) AS totalMembers
        FROM USERS u
        JOIN MEMBERS m ON u.user_id = m.user_id    
        JOIN GROUP_TASK g ON m.group_id = g.group_id    
        LEFT JOIN TASK t ON g.group_id = t.group_id     
        WHERE u.user_id = ?
        GROUP BY u.user_name, g.group_name, g.group_id , g.group_desc;
        `,
        [user.user_id]
    )

    res.status(200).json({groupSummary: rows });

})

export const get_task = catchAsync(async (req , res) => {

    const user = req.user;
    


    const [rows] = await pool.query(
        `
        SELECT 
            g.group_id AS groupId,
            g.group_name AS groupName,
            t.task_id AS taskId, 
            t.title AS task, 
            t.task_desc AS taskDesc, 
            t.status AS status, 
            DATE_FORMAT(t.due_date, '%b %d %Y') AS dueDate,
            task_user.user_name AS userName
        FROM GROUP_TASK g
        LEFT JOIN TASK t ON t.group_id = g.group_id
        LEFT JOIN USERS task_user ON task_user.user_id = t.user_id
        WHERE g.group_id IN (SELECT group_id FROM MEMBERS WHERE user_id = ?);
        `,
        [user.user_id , user.user_id]
    );

    const [rowsGroupMembers] = await pool.query(
        `SELECT
            G.GROUP_ID AS groupId,
            G.GROUP_NAME AS groupName,
            U.USER_NAME AS userName,
            U.USER_ID AS userId
        FROM GROUP_TASK G
        JOIN MEMBERS M ON G.GROUP_ID = M.GROUP_ID
        JOIN USERS U ON M.USER_ID = U.USER_ID
        WHERE G.GROUP_ID IN (
            SELECT M2.GROUP_ID
            FROM MEMBERS M2
            WHERE M2.USER_ID = ?
        )
        `,
        [user.user_id]
    )

    const result = rows.reduce((acc, item) => {
        if (!acc[item.groupName]) acc[item.groupName] = [];
        acc[item.groupName].push(item);
        return acc;
    }, {});

    const groupMembers = rowsGroupMembers.reduce((acc, item) => {
        if (!acc[item.groupName]) acc[item.groupName] = [];
        acc[item.groupName].push(item);
        return acc;
    }, {});

    res.status(200).json({ userData : result , members : groupMembers});

})

export const add_task = catchAsync( async (req , res) => {

    const user = req.user;
    const groupId = req.params.groupId;
    

    const {picId , title , desc , due} = req.body;

    const status = "prep"
    const [result] = await pool.query(
            `INSERT INTO TASK 
                ( group_id , created_by , user_id , title , task_desc , status , created_at , due_date)
            VALUES( ? , ? , ? , ? , ? , ?  , ? , ?)
            `,
            [groupId , user.user_id , picId ,title , desc , status , new Date() , due ]
    );

    if(result.affectedRows === 0){
        throw new AppError("Fail Creating The Task" , 400);
    }

    const [rowsUser] = await pool.query(
        `
        SELECT
            U.EMAIL AS email,
            U.USER_NAME AS userName,
            G.GROUP_NAME AS groupName
        FROM USERS U
        JOIN MEMBERS M ON U.USER_ID = M.USER_ID
        JOIN GROUP_TASK G ON M.GROUP_ID = G.GROUP_ID 
        WHERE U.USER_ID = ? AND G.GROUP_ID = ?
        `,
        [picId , groupId]
    );


    await sendEmail({
        to : rowsUser[0].email,
        subject : "You Have Been Assigned a Task",
        html : 
            `
            <h2>Hi ${rowsUser[0].userName},</h2>

            <p>You've been assigned a new task in "${rowsUser[0].groupName}":
            "${title}</p>"

            <p>
                Check it out on your dashboard:
                <a>
                    ${process.env.FRONTEND_URL}/dashboard
                </a>
            <p>
            `
    })


    const taskId = result.insertId;

    res.status(201).json({success : true , msg : 'Successfully Created The Task'});


})


export const create_group = catchAsync( async (req , res) => {

    const user = req.user;
    
    const {groupName , desc , emails} = req.body;

    const [result] = await pool.query(
        'INSERT INTO GROUP_TASK(group_name , group_desc , group_admin) VALUES(? , ? , ?)',
        [groupName , desc , user.user_id]
    )

    if(result.affectedRows === 0){
        throw new AppError('Fail Creating The Group' , 401)
    }

    const groupId = result.insertId;

    const [resultInsert] = await pool.query(
        'INSERT INTO MEMBERS (user_id , group_id , joined_at) VALUES (? , ? , ?)',
        [user.user_id , groupId , new Date()]
    )

    if(resultInsert.affectedRows === 0){
        throw new AppError("Fail Add Admin" , 400);
    }


    if(emails.length > 0){

        const inviteToken = crypto.randomBytes(10).toString("hex"); 
        const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); 

        const [resultInvite] = await pool.query(
            `
            INSERT INTO INVITES (group_id , invite_token , expires_at)
            VALUES(? , ? , ?)
            `,
            [groupId , inviteToken , expiresAt]
        )

        const inviteId = resultInvite.insertId;

        const [invite] = await pool.query(
            `
            SELECT  
                group_id AS groupId,
                inviteToken AS inviteToken,
            FROM INVITES
            WHERE invite_id ?
            `,
            [inviteId]
        );

        await Promise.all(emails.map(email =>
            sendEmail({
                to: email,
                subject: "Group invitation",
                html: 
                    `
                    <p>You have been invited to join the group "${groupName}".</p>

                    <p>
                        To accept the invitation, please click the link below:
                        <a>${process.env.FRONTEND_URL}/join/${invite[0].groupId}/${invite[0].inviteToken}</a>
                    </p>
                    `
            })
        ));



    }
            

    res.status(201).json({
        success : true , 
        message : `Successfully create ${groupName}` , 
        group : {
            groupName,
            groupDesc : desc,
            totalMembers: 1,
            totalTask: 0,
            totalComplete: 0
        },
    })

    
})

export const get_notes = catchAsync( async(req , res) => {
    
    const user = req.user;
    

    const [rows] = await pool.query(
        `
        SELECT 
            g.group_name AS groupName , 
            n.note_types  AS types, 
            n.note_details AS details,
            n.notes_link AS notesLink,
            u.user_name AS createpooly,
            DATE_FORMAT(n.created_at, '%d %b %Y') AS createdAt
        FROM NOTES n JOIN GROUP_TASK g ON g.group_id = n.group_id
        JOIN USERS u ON n.created_by = u.user_id 
        WHERE g.group_id  IN ( SELECT group_id FROM members WHERE user_id = ?);
        `,
        [user.user_id]
    );

    const [rowsGroup] = await pool.query(
        `
        SELECT 
            group_id AS groupId,
            group_name AS groupName
        FROM GROUP_TASK g
        WHERE g.group_id IN (
            SELECT group_id
            FROM MEMBERS 
            WHERE user_id = ?
        );
        `,
        [user.user_id]
    );



    res.status(200).json({success : true , notes : rows , groups : rowsGroup})

} )

export const add_notes = catchAsync( async(req , res) => {

    const groupId = req.params.groupId;
    const user = req.user;
    
    const {noteTypes , noteDetails , noteUrl} = req.body;

    const [result] = await pool.query(
        `
        INSERT INTO NOTES (group_id , note_types , note_details , created_by , created_at , notes_link)
        VALUES(? , ? , ?  ,? , ? , ?)
        `,
        [groupId , noteTypes , noteDetails , user.user_id , new Date() , noteUrl === "" ? null : noteUrl]
    );

    if(result.affectedRows === 0){
        throw new AppError("Fail Add Data" , 400)
    }

    const noteId = result.insertId;

    const [rows] = await pool.query(
        `
        SELECT 
            g.group_name AS groupName , 
            n.note_types  AS types, 
            n.note_details AS details,
            n.notes_link AS notesLink,
            u.user_name AS createpooly,
            DATE_FORMAT(n.created_at, '%d %b %Y') AS createdAt
        FROM NOTES n JOIN GROUP_TASK g ON g.group_id = n.group_id
        JOIN USERS u ON n.created_by = u.user_id
        WHERE note_id = ?;
        `,
        [noteId]
    )

    if(rows.length === 0){
        throw new AppError('notes not found' , 404)
    }

    res.status(201).json({success : true , message : "Successfully Add Notes" , note : rows[0]})

})

export const update_task = catchAsync( async(req , res) => {


    
    const taskId = req.params.taskId;

    const {status} = req.body;

    const [result] = await pool.query(
        `
        UPDATE TASK
        SET STATUS = ?
        WHERE TASK_ID = ?
        `,
        [status , taskId]
    );

    console.log(result);

    if(result.affectedRows === 0){
        throw new AppError('Fail Updated the status' , 400)
    }

    res.status(201).json({success : true , message : `successfully change status to ${status}`})
})

export const create_invite = catchAsync( async(req , res) => {



    const groupId = req.params.groupId;

    const inviteToken = crypto.randomBytes(10).toString("hex"); 
    const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); 

    const [result] = await pool.query(
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
    
    const user = req.user;
    

    const {groupId , tokenId} = req.body;

    const [rowsLink] = await pool.query(
        `
        SELECT 
            CASE 
                WHEN expires_at < NOW() THEN 'EXPIRED'
                ELSE 'VALID'
            END AS tokenStatus
        FROM INVITES
        WHERE invite_token = ?
        `,
        [tokenId]
    )

    if(rowsLink[0].tokenStatus === "EXPIRED"){
        throw new AppError("Invites Link is Expired" , 410);
    }

    const [rowsMember] = await pool.query(
        `
        SELECT *
        FROM MEMBERS
        WHERE user_id = ? AND group_id = ?
        `,
        [user.user_id, groupId]
    );

    if (rowsMember.length > 0) {
        throw new AppError("User is already in the group", 409);
    }

    const [result] = await pool.query(
        `
            INSERT INTO MEMBERS(group_id , user_id , joined_at)
            VALUES(? , ? , ?)
        `,
        [groupId , user.user_id , new Date()]
    )

    if(result.affectedRows === 0){
        throw new AppError("User Doesnt Exist" , 404);
    }

    res.status(201).json({success : true , message : "successfully add new members"})
});

export const send_invite = catchAsync( async(req , res) => {

    
    const {emails , groupId , link} = req.body;

    const [rows] = await pool.query(

        `
        SELECT group_name AS groupName
        FROM GROUP_TASK
        WHERE group_id = ?
        `,
        [groupId]
    )
    await Promise.all(emails.map(email =>
        sendEmail({
            to: email,
            subject: "Group invitation",
            html: 
                `
                <p>You have been invited to join the group "${rows[0].groupName}".</p>

                <p>
                    To accept the invitation, please click the link below:
                    <a>${link}</a>
                </p>
                `
        })
    ));

    res.status(200).json({success : true , message : "Successfully Sends Emails"})
})