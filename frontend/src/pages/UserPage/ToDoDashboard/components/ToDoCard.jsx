

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
                
                <div className="task-column prep-column">
                    <div className="column-header">
                        <h3 className="column-title"><i className="fas fa-clock"></i>Prepping</h3>
                        <div className="task-count">4</div>
                    </div>
                    <div className="task-list" id="prep-column">
                        
                        <div className="task-card prep" draggable="true" id="task1">
                            <div className="task-title">Research React Hooks</div>
                            <p className="task-desc">Study useEffect, useState, and custom hooks for upcoming project.</p>
                            <div className="task-meta">
                                <div className="task-assignee">
                                    <div className="assignee-avatar">AS</div>
                                    <span>Alex</span>
                                </div>
                                <div className="task-date">
                                    <i className="far fa-calendar"></i> Nov 15
                                </div>
                            </div>
                        </div>
                        
                        <div className="task-card prep" draggable="true" id="task2">
                            <div className="task-title">Set up Node.js backend</div>
                            <p className="task-desc">Initialize Express server with MongoDB connection for group project.</p>
                            <div className="task-meta">
                                <div className="task-assignee">
                                    <div className="assignee-avatar">MJ</div>
                                    <span>Maria</span>
                                </div>
                                <div className="task-date">
                                    <i className="far fa-calendar"></i> Nov 18
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <div className="task-column ongoing-column">
                    <div className="column-header">
                        <h3 className="column-title"><i className="fas fa-spinner"></i>Ongoing</h3>
                        <div className="task-count">3</div>
                    </div>
                    <div className="task-list" id="ongoing-column">
                        <div className="task-card ongoing" draggable="true" id="task3">
                            <div className="task-title">Build React components</div>
                            <p className="task-desc">Create reusable components for the frontend application.</p>
                            <div className="task-meta">
                                <div className="task-assignee">
                                    <div className="assignee-avatar">AS</div>
                                    <span>Alex</span>
                                </div>
                                <div className="task-date">
                                    <i className="far fa-calendar"></i> Nov 25
                                </div>
                            </div>
                        </div>
                        
                        <div className="task-card ongoing" draggable="true" id="task4">
                            <div className="task-title">Design database schema</div>
                            <p className="task-desc">Plan and create MongoDB collections for user data and posts.</p>
                            <div className="task-meta">
                                <div className="task-assignee">
                                    <div className="assignee-avatar">RJ</div>
                                    <span>Robert</span>
                                </div>
                                <div className="task-date">
                                    <i className="far fa-calendar"></i> Nov 20
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <div className="task-column completed-column">
                    <div className="column-header">
                        <h3 className="column-title"><i className="fas fa-check-circle"></i>Finished</h3>
                        <div className="task-count">2</div>
                    </div>
                    <div className="task-list" id="completed-column">
                        <div className="task-card completed" draggable="true" id="task5">
                            <div className="task-title">Project requirements</div>
                            <p className="task-desc">Define project scope and create user stories for the application.</p>
                            <div className="task-meta">
                                <div className="task-assignee">
                                    <div className="assignee-avatar">AS</div>
                                    <span>Alex</span>
                                </div>
                                <div className="task-date">
                                    <i className="far fa-calendar-check"></i> Nov 10
                                </div>
                            </div>
                        </div>
                        
                        <div className="task-card completed" draggable="true" id="task6">
                            <div className="task-title">Wireframe design</div>
                            <p className="task-desc">Create wireframes for all main application screens in Figma.</p>
                            <div className="task-meta">
                                <div className="task-assignee">
                                    <div className="assignee-avatar">KB</div>
                                    <span>Katie</span>
                                </div>
                                <div className="task-date">
                                    <i className="far fa-calendar-check"></i> Nov 8
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default ToDoCard;