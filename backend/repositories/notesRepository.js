class NotesRespository{

    constructor(db){
        this.db = db;
    }

    async getNotes(userId){

        const [rows] = await this.db.query(
            `
            SELECT 
                g.group_name AS groupName , 
                n.note_types  AS types, 
                n.note_details AS details,
                n.notes_link AS notesLink,
                u.user_name AS createdBy,
                DATE_FORMAT(n.created_at, '%d %b %Y') AS createdAt
            FROM NOTES n JOIN GROUP_TASK g ON g.group_id = n.group_id
            JOIN USERS u ON n.created_by = u.user_id 
            WHERE g.group_id  IN ( SELECT group_id FROM members WHERE user_id = ?);
            `,
            [userId]
        );

        return rows;
    }

}


export default NotesRespository;