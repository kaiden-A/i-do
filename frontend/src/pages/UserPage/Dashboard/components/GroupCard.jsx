import { useNavigate } from "react-router-dom";

function GroupCard({name , totalMembers , totalComplete , totalTask , desc}){

    const navigate = useNavigate();

    const goNavigate = () => {
        navigate(`/studies/#${name}`)
    }

    return(
        <>
                
            <div className="group-card" onClick={goNavigate}>
                <div className="group-header">
                    <h3 className="group-name">{name}</h3>
                    <div className="members-count">
                        <i className="fas fa-user-graduate"></i> {totalMembers}
                    </div>
                </div>
                <p className="group-description">{desc}</p>
                <div className="progress-bar">
                    <div className="progress-fill" style={{width : `${totalComplete}%`}}></div>
                </div>
                <div className="group-footer">
                    <span>{`${totalTask} tasks • ${totalComplete}% complete `}</span>
                </div>
            </div>
            
        </>
    )
}

export default GroupCard;