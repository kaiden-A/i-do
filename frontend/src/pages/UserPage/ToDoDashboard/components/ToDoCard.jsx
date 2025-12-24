import { useState } from "react";
import Column from "./Column";
import CreateTask from "./CreateTask";

function ToDoCard({title , tasks}){

    const [openTask , setOpenTask] = useState(false);


    return(
        <> 
            {openTask && <CreateTask onClose={() => setOpenTask(false)}/>}
            <div>
                <div className="section-title">
                    <div>
                        <i className="fas fa-columns"></i> {`Task Board : ${title} `}
                    </div>
                    <div style={{display : 'flex'}}>
                        <button className="btn btn-accent" onClick={() => setOpenTask(true)}>
                            <i className="fas fa-plus-circle" style={{color: "white"}}></i> Add Task
                        </button>   
                        <button className="btn btn-primary" style={{marginLeft : "10px" , paddingBottom: 0 , paddingTop : 0}}>
                            <i className="fas fa-user-plus" style={{color : "white"}}></i> Invite Members
                        </button>     
                    </div>
                </div>
                
                <div className="task-board">
                    
                    <Column status={"prep"} tasks={tasks} total={tasks.filter(t => t.status === "prep").length} />
                    <Column status={"ongoing"} tasks={tasks} total={tasks.filter(t => t.status === "ongoing").length}/>
                    <Column status={"finish"} tasks={tasks} total={tasks.filter(t => t.status === "finish").length}/>
                </div>

                
            </div>
        </>
    )
}

export default ToDoCard;