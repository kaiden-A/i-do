class TaskRepository{

    constructor(db){
        this.db = db;
    }

    async addNewtask(groupId , userId , picId ,title , desc , status , date , due ){
        
        const [result] = await this.db.query(
                `INSERT INTO TASK 
                    ( group_id , created_by , user_id , title , task_desc , status , created_at , due_date)
                VALUES( ? , ? , ? , ? , ? , ?  , ? , ?)
                `,
                [groupId , userId , picId ,title , desc , status , date , due]
        );

        return result;
    }

}


export default TaskRepository;