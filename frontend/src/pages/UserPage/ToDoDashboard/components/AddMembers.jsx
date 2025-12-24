import axios from "axios";
import { useEffect , useState } from "react";
import Notifications from "../../../Global/Notifications";


function AddMembers({onClose , groupId}){

    const [link , setLink] = useState("");
    const [copied , setCopied] = useState(false);

    useEffect(() => {

        const invite = async () => {

            try{

                const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/invite/create/${Number(groupId)}` ,
                    {},
                    {withCredentials : true}
                );

                setLink(res.data.inviteLink);


            }catch(err){
                console.error(err.responses.data.message || err.message)
            }
            
        }

        invite();

    }, []);

    const copyLink = async () =>{

        try{

            await navigator.clipboard.writeText(link);
            setCopied(true);

        }catch(err){
            console.error(err);
        }

    }

    return(
        <>
            <Notifications
                open={copied}
                onClose={() => setCopied(false)}
                message={"successfully copied link"}
                popup={true}
            />
            <div className="modal active" id="inviteMemberModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Invite Study Partners</h3>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>
                    <form id="inviteMemberForm">
                        <div className="form-group">
                            <label className="form-label">Add by Email</label>
                            <input 
                                type="text" 
                                id="inviteEmails" 
                                className="form-control" 
                                placeholder="student1@university.edu, student2@university.edu"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Or share invite link</label>
                            <div className="invite-link-box">
                                <input type="text" id="inviteLink" value={link} readOnly/>
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    style={{borderRadius: "0"}}
                                    onClick={copyLink}
                                >Copy
                                </button>
                            </div>
                            <small style={{color: "var(--dark-gray)" , display: "block" , marginTop: "8px"}}>Anyone with this link can join your study group</small>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                            <button type="submit" className="btn btn-success">Send Invites</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default AddMembers;