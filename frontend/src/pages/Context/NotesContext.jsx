import { useState , useEffect } from "react";
import { createContext } from "react";
import axios from "axios";

export const NotesContext = createContext();

export function NotesProvider({children}){

    const [notes , setNotes] = useState([]);
    const [groups , setGroups] = useState([]);

    useEffect(() => {

        const fetchNotes = async () => {

            try{

                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/notes` , 
                    {withCredentials : true}
                )

                console.log(res.data);

                setNotes(res.data.notes);
                setGroups(res.data.groups);

            }catch(err){
                console.log(err);
                throw new Error(err);
            }

        }

        fetchNotes();

    }, []);

    return(

        <NotesContext.Provider value={{notes , setNotes , groups , setGroups}}>
            {children}
        </NotesContext.Provider>
    )



}