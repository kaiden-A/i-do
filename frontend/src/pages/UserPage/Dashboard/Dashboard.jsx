import GroupCard from "./components/GroupCard";
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
                    <GroupCard/>
                    <GroupCard/>
                    <GroupCard/>
                </div>

            </section>
        </div>
    )
}
export default Dashboard;