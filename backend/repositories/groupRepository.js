class GroupRepository{

    constructor(db){
        this.db = db;
    }

    async createNewGroup(groupName , desc , userId){

        const [result] = await this.db.query(
            'INSERT INTO GROUP_TASK(group_name , group_desc , group_admin) VALUES(? , ? , ?)',
            [groupName , desc , userId]
        );

        return result;
    }

    async createGroupLink(groupId , inviteToken , expiresAt){
        
        const [resultInvite] = await this.db.query(
            `
            INSERT INTO INVITES (group_id , invite_token , expires_at)
            VALUES(? , ? , ?)
            `,
            [groupId , inviteToken , expiresAt]
        );

        return resultInvite;
    }

    async takeToken(inviteId){

        const [invite] = await this.db.query(
            `
            SELECT  
                group_id AS groupId,
                inviteToken AS inviteToken,
            FROM INVITES
            WHERE invite_id ?
            `,
            [inviteId]
        );

        return invite;

    }

}

export default GroupRepository;