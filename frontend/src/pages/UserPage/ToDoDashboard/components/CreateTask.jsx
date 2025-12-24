import { useState } from "react";


function CreateTask({onClose}){

    const [title , setTitle] = useState("");
    const [desc , setDesc] = useState("");
    const [due , setDue] = useState("");

    return(
        <>
        <div className="modal active" >
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Add New Study Task</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form id="addTaskForm">
                    <div className="form-group">
                        <label className="form-label" htmlFor="taskTitle">Task Title</label>
                        <input 
                            type="text" 
                            id="taskTitle" 
                            className="form-control" 
                            placeholder="e.g., Complete Chapter 5 Exercises" 
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="taskDescription">Description</label>
                        <textarea 
                            id="taskDescription" 
                            className="form-control" 
                            rows="3" placeholder="Describe the study task in detail"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="taskAssignee">Assign To</label>
                        <select id="taskAssignee" className="form-control">
                            <option value="" disabled>Group Member</option>
                            <option value="AS">Alex Smith</option>
                            <option value="MJ">Maria Johnson</option>
                            <option value="RJ">Robert Jones</option>
                            <option value="KB">Katie Brown</option>
                            <option value="DL">David Lee</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="taskDueDate">Due Date</label>
                        <input 
                            type="date" 
                            id="taskDueDate" 
                            className="form-control"
                            value={due}
                            onChange={(e) => setDue(e.target.value)}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default CreateTask;