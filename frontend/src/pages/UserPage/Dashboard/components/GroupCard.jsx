

function GroupCard({name , totalMembers , totalComplete , totalTask}){

    return(
        <>
                
            <div className="group-card">
                <div className="group-header">
                    <h3 className="group-name">{name}</h3>
                    <div className="members-count">
                        <i className="fas fa-user-graduate"></i> {totalMembers}
                    </div>
                </div>
                <p className="group-description">Advanced web development course study group focusing on React, Node.js, and databases.</p>
                <div className="progress-bar">
                    <div className="progress-fill" style={{width : `${totalComplete}%`}}></div>
                </div>
                <div className="group-footer">
                    <span>{`${totalTask} tasks • ${totalComplete}% complete `}</span>
                    <span>Due: Dec 15</span>
                </div>
            </div>
            
        </>
    )
}

export default GroupCard;