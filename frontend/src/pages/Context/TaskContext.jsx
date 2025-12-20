import axios from "axios";
import { createContext , useState , useEffect} from "react";

export const TaskContext = createContext();

export function TaskProvider({children}){

    const [data , setData] = useState([]);

    useEffect(() => {

        const fetchData  = async() => {

            try{

                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks` , 
                    {withCredentials : true}
                )

                setData(res.data);

            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    } , [])

    return(

        <TaskContext.Provider value={{data , setData}}>
            {children}
        </TaskContext.Provider>
    )
}