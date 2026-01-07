import axios from "axios";
import { useState } from "react";


function CreateTask({onClose , members , groupId , onSuccess}){

    const [title , setTitle] = useState("");
    const [desc , setDesc] = useState("");
    const [due , setDue] = useState("");
    const [userId , setUserId] = useState("");

    const [submit , setSubmit] = useState(false);


    const sendForm = async (e) => {

        e.preventDefault();
        setSubmit(true);

        try{

            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${groupId}` , 
                {picId : userId, title , desc , due},
                {withCredentials : true}
            );

            if(res.data.success){
                onSuccess();
                onClose();
            }

        }catch(err){
            console.error(err.responses.data.message || err.message)
        }finally{
            setSubmit(false);
        }
    }

    return(
        <>
        <div className="modal active" >
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Add New Study Task</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form id="addTaskForm" onSubmit={sendForm}>
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
                        <select 
                            id="taskAssignee" 
                            className="form-control"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        >
                            <option value="" disabled>Group Member</option>
                            {
                                members.map(m => 
                                    <option key={m.userId} value={m.userId}>{m.userName}</option>
                                )
                            }
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
                        <button 
                            type="submit" 
                            disabled={submit} 
                            className="btn btn-primary"
                            style={{backgroundColor : submit ? "#7d8bfc"  : "#5d6afb" , cursor: submit ? "not-allowed" : "pointer"}}
                        >
                            {`${submit ? "Submitting task..." : "Add Task"}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default CreateTask;