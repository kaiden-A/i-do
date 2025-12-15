import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import axios from "axios";

function UserPage(){

    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () =>{
                
                try{

                    const res = await axios.get(
                        `${import.meta.env.VITE_BACKEND_URL}/api/` , 
                        {withCredentials : true}
                    )

                    if(!res.data.success){
                        throw new Error(res.data.message);
                    }

                    navigate('/dashboard');

                }catch(err){
                    console.log(err);

                    if(err.response?.status === 401){
                        navigate('/login')
                    }
                }

                
            }
        
        fetchData();

    }, [])


    return(
        <>
            <div className="app-container" style={{display : "flex"}}>
                <SideBar/>
                <Outlet></Outlet>
            </div>
        </>
    )
}

export default UserPage;