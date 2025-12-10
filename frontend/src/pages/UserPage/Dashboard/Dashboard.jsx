import Header from "./components/Header";
import "./styles/Dashboard.css"
import "./styles/GroupCard.css"
function Dashboard(){

    return(
        <div className="mother">
            <Header/>
    
            <section className="groups-section">
                <h2 className="section-title">
                    <div>
                        <i className="fas fa-users">
                        </i> My Study Groups
                    </div>
                </h2>
                <div className="groups-grid">
                    
                    <div className="group-card">
                        <div className="group-header">
                            <h3 className="group-name">Web Development</h3>
                            <div className="members-count">
                                <i className="fas fa-user-graduate"></i> 6
                            </div>
                        </div>
                        <p className="group-description">Advanced web development course study group focusing on React, Node.js, and databases.</p>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{width : "75%"}}></div>
                        </div>
                        <div className="group-footer">
                            <span>18 tasks • 75% complete</span>
                            <span>Due: Dec 15</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Dashboard;