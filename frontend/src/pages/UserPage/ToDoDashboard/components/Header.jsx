

function Header(){


    return(
        <>
            <header className="header" style={{marginBottom : "10px"}}>
                <div style={{display: "flex" , alignItems: "center"}}>
                    <h1 className="page-title"><span>to-Do</span> Manage All Your Task</h1>
                </div>
                <div className="header-actions">
                    <button className="btn btn-primary" id="createGroupBtn">
                        <i className="fas fa-layer-group"></i> New Study Group
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header;