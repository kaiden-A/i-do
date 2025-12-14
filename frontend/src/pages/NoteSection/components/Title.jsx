import "../styles/Title.css"

function Title(){

    return(

        <div style={headerStyle} className="title-box">
            <h2 style={titleStyle}>
                <i className="fas fa-sticky-note"></i>
                Study Notes & Resources
            </h2>
            <div>
                <button style={btnStyle} className="btn btn-success">
                    <i className="fas fa-plus"></i> Add Resource
                </button> 
            </div>

        </div>
    )
}

const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    width: "100%",
    marginBottom : "10px"
};

    const titleStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: 0,
    fontSize: "1.5rem",
    color: "#1e293b",
};

const btnStyle = {
    whiteSpace: "nowrap",
    flexShrink: 0,      // ✅ button never shrinks
};

export default Title;