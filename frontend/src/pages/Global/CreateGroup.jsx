

function CreateGroup({onClose}){
    return(
        <>
            <div className="modal active" id="createGroupModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Create New Study Group</h3>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>
                    <form id="createGroupForm">
                        <div className="form-group">
                            <label className="form-label" htmlFor="groupName">Group Name</label>
                            <input type="text" id="groupName" className="form-control" placeholder="e.g., Algorithms Study Group" required/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" for="groupDescription">Description</label>
                            <textarea id="groupDescription" className="form-control" rows="3" placeholder="What will this group focus on?"></textarea>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Add Study Partners</label>
                            <input type="text" id="memberEmails" className="form-control" placeholder="Enter email addresses separated by commas"/>
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