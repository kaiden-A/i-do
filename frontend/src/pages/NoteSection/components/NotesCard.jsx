

function NotesCard({icon , noteDetails , createdBy , createdAt , haveLink , link}){


    return(
        <>
        {
            haveLink ? (
                <div className="note-item">
                    <a href={link} target="_blank" className="note-link">
                        <i className={`fas ${icon}`}></i> {noteDetails}
                    </a>
                    <div className="note-date">{`Added by ${createdBy} , ${createdAt}`}</div>
                </div>
            ) : (
                <div className="note-item">
                        <div className="note-text">
                            <i className={`fas ${icon}`}></i> {noteDetails}
                        </div>
                    <div className="note-date">{`Added by ${createdBy} , ${createdAt}`}</div>
                </div>

            )
        }
        </>
    )
}

export default NotesCard;