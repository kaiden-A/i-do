class GroupRepository{

    constructor(db){
        this.db = db;
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

}

export default GroupRepository;