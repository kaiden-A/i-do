import { createContext , useState , useEffect } from "react";
import axios from "axios";


export const DashboardContext = createContext();

export function DashboardProvider({children}){

    const [data , setData] = useState();

    useEffect(() => {

        const fetchData = async () => {

            try{

                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/groups` , {
                    withCredentials : true
                })

                setData(res.data.groupSummary);

            }catch(err){
                console.error(err.response?.data || err.message);
            }

        }

        fetchData();

    }, [])

    return(
        <DashboardContext.Provider value={{data , setData}}>
            {children}
        </DashboardContext.Provider>
    )


}