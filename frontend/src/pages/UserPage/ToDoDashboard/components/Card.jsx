

function Card({status , title , desc , pic , date}){

    const sty = ["prep" , "ongoing" , "completed"];

    return(
        <>
            <div className={`task-card ${statusCard(status)}`}>
                <div className="task-title">{title}</div>
                <p className="task-desc">{desc}</p>
                <div className="task-meta">
                    <div className="task-assignee">
                        <div className="assignee-avatar">{'A'}</div>
                        <span>{pic}</span>
                    </div>
                    <div className="task-date">
                        <i className="far fa-calendar"></i> {date}
                    </div>
                </div>
            </div>
        </>
    )
}

function statusCard(style){

    const status = {
        prep : "prep",
        ongoing : "ongoing",
        finish : "completed"
    }

    return status[style];
}

export default Card;