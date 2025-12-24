import { useContext , useState } from "react";
import { TaskContext } from "../../../Context/TaskContext";
import axios from "axios";
import Notifications from "../../../Global/Notifications";


function ChangeStatus({title , onClose , taskId}){

    const [status , setStatus] = useState("");
    const [msg , setMsg] = useState("");
    const [noti , setNoti] = useState(false);

    const {setData} = useContext(TaskContext);

    const sendForm = async (e) => {

        e.preventDefault();

        try{

            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${Number(taskId)}`,
                {status : status},
                {withCredentials : true}
            );

            if(res.data.success){
                setData(prevData => {
                    const updatedData = {};

                    for (const groupName in prevData) {
                        const groupValue = prevData[groupName];

                        // ✅ If it's NOT an array, just copy it
                        if (!Array.isArray(groupValue)) {
                            updatedData[groupName] = groupValue;
                            continue;
                        }

                        // ✅ If it IS an array, update task status
                        updatedData[groupName] = groupValue.map(task => {
                        if (task.taskId === Number(taskId)) {
                            return {
                            ...task,
                            status: status
                            };
                        }
                        return task;
                        });
                    }

                    return updatedData;
                });

                setMsg(res.data.message);
                setNoti(true);
            }

        }catch(err){
            console.error(err.responses?.data.message || err.message)
        }
    }

    return(
        <>
            <Notifications
                message={msg}
                open={noti}
                onClose={() => setNoti(false)}
                popup={true}
            />            
            <div className="modal active">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">{title}</h3>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>
                    <form onSubmit={sendForm}>                      
                        <div className="form-group">
                            <label className="form-label" htmlFor="noteType">Change Status</label>
                            <select 
                                id="noteType" 
                                className="form-control"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="" disabled>Select status</option>
                                <option value={"prep"}>prep</option>
                                <option value={"ongoing"}>ongoing</option>
                                <option value={"finish"}>finish</option>

                            </select>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-success">Change Status</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}


export default ChangeStatus;