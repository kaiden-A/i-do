import GroupCard from "./components/GroupCard";
import Header from "./components/Header";
import SectionTitle from "./components/SectionTitle";
import "./styles/Dashboard.css"
import "./styles/GroupCard.css"

import Notifications from "../../Global/Notifications";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "../../Context/DashboardContext";
function Dashboard(){

    const [noti , setNoti] = useState(false);
    const {data , setData} = useContext(DashboardContext);
    const navigate = useNavigate();

    useEffect(() => {
        const openTimer = setTimeout(() => {
            setNoti(true);

            const closeTimer = setTimeout(() => {
                setNoti(false);
            }, 3000); 

            return () => clearTimeout(closeTimer);
        }, 1000);

        return () => clearTimeout(openTimer);
    }, []);



    return(
        <>  
            <Notifications 
                message={"Welcome to i-Do Study Management!"}
                open={noti}
                onClose={() => setNoti(false)}
                popup={true}
            />
            <div className="mother">
                <Header/>
        
                <section className="groups-section">
                    <SectionTitle/>
                    <div className="groups-grid">
                        {
                            data?.length > 0 ? (
                                
                                data.map((d , i) => 
                                    <GroupCard
                                        key={i}
                                        name={d?.groupName}
                                        totalMembers={d?.totalMembers}
                                        totalComplete={d?.totalComplete}
                                        totalTask={d?.totalTask}
                                        desc={d?.groupDesc}

                                    />
                                )

                            ) : (
                                <p>No Group Yet</p>
                            )
                        }
                    </div>

                </section>
            </div>
        </>
    )
}
export default Dashboard;