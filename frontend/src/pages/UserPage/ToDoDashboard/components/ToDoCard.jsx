import Card from "./Card";
import Column from "./Column";


function ToDoCard(){

    return(
        <div>
            <div className="section-title">
                <div>
                    <i className="fas fa-columns"></i> Task Board: Web Development Group
                </div>
                <div style={{display : 'flex'}}>
                    <button className="btn btn-accent" >
                        <i className="fas fa-plus-circle" style={{color: "white"}}></i> Add Task
                    </button>   
                    <button className="btn btn-primary" style={{marginLeft : "10px" , paddingBottom: 0 , paddingTop : 0}}>
                        <i className="fas fa-user-plus" style={{color : "white"}}></i> Invite Members
                    </button>     
                </div>
            </div>
            
            <div className="task-board">
                
                <Column
                    status={"prep"}
                />
                
                
                <Column
                    status={"ongoing"}
                />
                
                <Column
                    status={"finish"}
                />
            </div>

            
        </div>
    )
}

export default ToDoCard;