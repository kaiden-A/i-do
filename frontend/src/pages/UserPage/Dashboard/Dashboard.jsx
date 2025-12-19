import GroupCard from "./components/GroupCard";
import Header from "./components/Header";
import SectionTitle from "./components/SectionTitle";
import "./styles/Dashboard.css"
import "./styles/GroupCard.css"

import Notifications from "../../Global/Notifications";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Dashboard(){

    const [noti , setNoti] = useState(false);
    const [data , setData] = useState([]);
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

    useEffect(() => {

        const fetchData = async () => {

            try{

                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/groups` , {
                    withCredentials : true
                })

                setData(res.data.groupSummary);
                if(!res.data.success){
                    throw new Error(res.data.message);
                }

            }catch(err){

            }

        }

        fetchData();

    }, [])



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