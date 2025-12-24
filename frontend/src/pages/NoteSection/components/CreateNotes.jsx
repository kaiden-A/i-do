import axios from "axios";
import { useContext } from "react";
import { useState , useEffect } from "react";
import { NotesContext } from "../../Context/NotesContext";


function CreateNotes({onClose}){

    const [title , setTitle] = useState("");
    const [url , setUrl] = useState("");
    const [type , setType] = useState("");
    const [groupId , setGroupId] = useState("");

    const {setNotes , groups} = useContext(NotesContext);

    useEffect(() => {
        if (groups?.length > 0) {
            setGroupId(groups[0].groupId.toString()); // convert to string
        }
    }, [groups]);


    const sendForm = async (e) => {

        e.preventDefault();

        try{

            console.log("group: " + groupId)
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${Number(groupId)}` , 
                {noteTypes : type ,  noteDetails : title , noteUrl : url},
                {withCredentials : true}
            );

            if(res.data.success){
                
                setNotes(n => [...n , res.data.note]);
                onClose();
            }

        }catch(err){
            console.error(err.response.data?.message || err.message);
        }

    }


    return(
        <>
            <div className="modal active" id="addNoteModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Add Study Resource</h3>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>
                    <form onSubmit={sendForm}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="groups">Group Name</label>
                            <select 
                                id="groups" 
                                className="form-control"
                                value={groupId}
                                onChange={(e) => setGroupId(e.target.value)}
                            >
                                {
                                    groups?.map(g => 
                                        <option key={g.groupId} value={g.groupId.toString()}>
                                            {g.groupName}
                                        </option>
                                    )
                                }
                                
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="noteType">Resource Type</label>
                            <select 
                                id="noteType" 
                                className="form-control"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="docs">Link (Google Docs, Lecture Notes, etc.)</option>
                                <option value="reminder">Reminder Notes</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="noteTitle">Title</label>
                            <input 
                                type="text" 
                                id="noteTitle" 
                                className="form-control" 
                                placeholder="e.g., Chapter 3 Summary" 
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="noteContent">Content or URL</label>
                            <input 
                                type="text" 
                                id="noteContent" 
                                className="form-control" 
                                placeholder="Enter URL or note content" 
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-success">Add Resource</button>
                        </div>
                    </form>
                </div>
            </div>
        
        </>
    )
}

export default CreateNotes;