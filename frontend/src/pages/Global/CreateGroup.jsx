import axios from "axios";
import { useContext, useState } from "react";
import { DashboardContext } from "../Context/DashboardContext";


function CreateGroup({onClose}){

    const [name , setName] = useState("");
    const [desc , setDesc] = useState("");
    const [email , setEmail] = useState("");

    const {setData} = useContext(DashboardContext);
    

    const sendForm = async (e) => {


        e.preventDefault();
        const emails = email
            .split(',')
            .map(e => e.trim())
            .filter(e => e && e.includes('@')); // only keep valid emails


        console.log(emails);
        try{

            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/groups` , 
                {groupName : name , desc : desc , emails : emails},
                {withCredentials : true}
            )

            if(res.data.success){
                setData(d => [...d , res.data.group ]);
                onClose();
            }

        }catch(err){
            console.log(err);
        }

    }

    return(
        <>
            <div className="modal active" id="createGroupModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Create New Study Group</h3>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>
                    <form onSubmit={sendForm}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="groupName">Group Name</label>
                            <input 
                                type="text" 
                                id="groupName" 
                                className="form-control" 
                                placeholder="e.g., Algorithms Study Group" 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="groupDescription">Description</label>
                            <textarea 
                                id="groupDescription" 
                                className="form-control" 
                                rows="3" 
                                placeholder="What will this group focus on?"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Add Study Partners</label>
                            <input 
                                type="text" 
                                id="memberEmails" 
                                className="form-control" 
                                placeholder="Enter email addresses separated by commas"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}    
                            />
                            <small style={{ color: "var(--dark-gray)" , display: "block" , marginTop: "8px"}}>Or share invite link after creation</small>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Create Study Group</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default CreateGroup;