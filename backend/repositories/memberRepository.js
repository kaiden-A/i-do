class MemberRepository{


    constructor(db){
        this.db = db;
    }

    async createNewUser(userId , userName , email , hasPassword , createdAt){

        const [result] = await db.query(
            'INSERT INTO USERS(user_id , user_name , email , hash_password , created_at) VALUES(? , ? , ? , ? , ?)' , 
            [userId , userName , email , hasPassword , createdAt]
        );

        return result;

    }

    async insertIntoGroup(userId , groupId , date){
        
        const [resultInsert] = await db.query(
            'INSERT INTO MEMBERS (user_id , group_id , joined_at) VALUES (? , ? , ?)',
            [userId , groupId , date]
        );

        return resultInsert;
    }

    async findByEmail(email){

        const [rows] = await this.db.query(
            'SELECT * FROM USERS WHERE email = ?',
            [email]
        )

        return rows;
    }

    async getDashboard({userId}){

        const [rows] = await this.db.query(
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
            [userId]
        );

        return rows;
    }


    async groupData(userId){

        const [rows] = await this.db.query(
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
            [userId , userId]
        );

        return rows;
    }


    async groupMembers(userId){

        const [rowsGroupMembers] = await db.query(
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
            [userId]
        )

        return rowsGroupMembers;

    }

    async getMemberContext(userId , groupId){
        
        const [rowsUser] = await db.query(
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
            [userId , groupId]
        );

        return rowsUser;
    }

}

export default MemberRepository;