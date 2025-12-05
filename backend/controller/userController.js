
export const create_group = async (req , res) => {

    const user = req.user;
    const db = req.app.locals.db;
    const {groupName} = req.body;

    try{

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
            return res.status(401).json({error : true , msg : 'Fail to add Admin in the group'})
        }

        res.json({success : true , msg : `Successfully create ${groupName}`})

    }catch(err){

        console.log(err);
        res.status(501).json({error : true , msg : 'Server Error'});
    }
}