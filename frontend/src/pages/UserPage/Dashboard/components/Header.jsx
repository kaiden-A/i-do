import { useState } from "react";
import CreateGroup from "../../../Global/CreateGroup";


function Header(){

    const [create , setCreate] = useState(false);

    return(

        <>
            {create && <CreateGroup onClose={() => setCreate(false)}/>}
            <header className="header">
                <div style={{display: "flex" , alignItems: "center"}}>
                    <h1 className="page-title"><span>i-Do</span> Your Study Manager</h1>
                </div>
                <div className="header-actions">
                    <button className="btn btn-primary"
                        onClick={() => setCreate(!create)}
                    >
                        <i className="fas fa-layer-group"></i> New Study Group
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header;