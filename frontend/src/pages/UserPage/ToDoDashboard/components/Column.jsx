import Card from "./Card";

function Column({ status , total}){

    return(

        <>
            <div className={`task-column ${columnStyle(status)}`}>
                <div className="column-header">
                    <h3 className="column-title"><i className="fas fa-clock"></i>
                        {`${status === "prep" ? "prepping" : (status === "ongoing" ? "ongoing" : "completed") }`}
                    </h3>
                    <div className="task-count">{total}</div>
                </div>
                <div className="task-list">
                    
                    <Card
                        status={`prep`}
                    />
                    <Card
                        status={"prep"}
                    />
                </div>
            </div>
        </>
    )

}

function columnStyle(style){

    const status = {
        prep : "prep-column",
        ongoing : "ongoing-column",
        finish : "completed-column"
    }

    return status[style];
}

export default Column;