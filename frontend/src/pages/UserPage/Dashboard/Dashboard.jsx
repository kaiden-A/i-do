import GroupCard from "./components/GroupCard";
import Header from "./components/Header";
import SectionTitle from "./components/SectionTitle";
import "./styles/Dashboard.css"
import "./styles/GroupCard.css"
function Dashboard(){

    return(
        <div className="mother">
            <Header/>
    
            <section className="groups-section">
                <SectionTitle/>
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