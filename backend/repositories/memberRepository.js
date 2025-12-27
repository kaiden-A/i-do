class MemberRepository{


    constructor(db){
        this.db = db;
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


}

export default MemberRepository;