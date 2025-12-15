import "./styles/Notifications.css";
function Notifications({message , open , onClose , success , popup}){

    if(!open) return null;

    const color = {
        backgroundColor : `${success ? '#10b981' : (popup ? "#5d6afb" : "#b91010ff") }`
    }

    return(
        <div className="notifications" style={color}>
            <div>
                {message}
            </div>
            <div>
                <button 
                style={{
                    padding : 0 , 
                    marginLeft: "7px" , 
                    backgroundColor :`${success ? '#10b981' : (popup ? "#5d6afb" : "#b91010ff") }`
                }} 
                className="btn btn-primary" 
                onClick={onClose}>x</button>
            </div> 
        </div>
    )

}

export default Notifications;