import { useState } from "react";
import Column from "./Column";
import CreateTask from "./CreateTask";
import AddMembers from "./AddMembers";
import Notifications from "../../../Global/Notifications";

function ToDoCard({title , tasks , members , groupId}){

    const [openTask , setOpenTask] = useState(false);
    const [openMem , setOpenMem] = useState(false);

    const [task , setTask] = useState(false);

    const successTask = () => {
        setTask(true);
    }

    return(
        <> 
            <Notifications
                success={true}
                message={"Successfully Create Task"}
                open={task}
                onClose={() => setTask(false)}
            />
            {openTask && 
                <CreateTask 
                    onClose={() => setOpenTask(false)} 
                    members={members}
                    groupId={groupId}
                    onSuccess={successTask}
                />
            }
            {openMem && 
                <AddMembers 
                    onClose={() => setOpenMem(false)}
                    groupId={groupId}    
                />
            }
            <div>
                <div className="section-title">
                    <div>
                        <i className="fas fa-columns"></i> {`Task Board : ${title} `}
                    </div>
                    <div style={{display : 'flex'}}>
                        <button className="btn btn-accent" onClick={() => setOpenTask(true)}>
                            <i className="fas fa-plus-circle" style={{color: "white"}}></i> Add Task
                        </button>   
                        <button className="btn btn-primary" style={{marginLeft : "10px" , paddingBottom: 0 , paddingTop : 0}}
                            onClick={() => setOpenMem(true)}
                        >
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