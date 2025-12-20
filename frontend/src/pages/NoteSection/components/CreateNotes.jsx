


function CreateNotes({onClose}){

    return(
        <>
        <div class="modal active" id="addNoteModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Add Study Resource</h3>
                    <button class="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form id="addNoteForm">
                    <div class="form-group">
                        <label class="form-label" htmlFor="noteType">Resource Type</label>
                        <select id="noteType" class="form-control">
                            <option value="link">Link (Google Docs, Lecture Notes, etc.)</option>
                            <option value="text">Study Notes</option>
                            <option value="file">File Attachment</option>
                            <option value="video">Video Resource</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label" htmlFor="noteTitle">Title</label>
                        <input type="text" id="noteTitle" class="form-control" placeholder="e.g., Chapter 3 Summary" required/>
                    </div>
                    <div class="form-group">
                        <label class="form-label" htmlFor="noteContent">Content or URL</label>
                        <input type="text" id="noteContent" class="form-control" placeholder="Enter URL or note content" required/>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" class="btn btn-success">Add Resource</button>
                    </div>
                </form>
            </div>
        </div>
        
        </>
    )
}

export default CreateNotes;