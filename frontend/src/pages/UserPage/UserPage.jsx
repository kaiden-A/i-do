import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { useNavigate , useLocation} from "react-router-dom";

import { useEffect } from "react";
import axios from "axios";

function UserPage(){

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const fetchData = async () =>{
                
                try{

                    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/` , 
                        {withCredentials : true}
                    )

                    if(res.data.success){
                        if(location.pathname === '/' || location.pathname === '/login'){
                            navigate('/dashboard');
                        }
                    }

                }catch(err){
                    console.error(err.response?.data?.message || err.message);

                    if(err.response?.status === 401){
                        navigate('/login')
                    }
                }

                
            }
        
        fetchData();


    }, [location.pathname])


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