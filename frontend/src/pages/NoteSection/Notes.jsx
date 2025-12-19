import { useEffect, useState } from "react";
import NotesCard from "./components/NotesCard";
import Title from "./components/Title";
import "./styles/Notes.css"
import axios from "axios";

function Notes(){

    const [notes , setNotes] = useState([]);

    useEffect(() => {

        const fetchNotes = async () => {

            try{

                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/notes` , 
                    {withCredentials : true}
                )

                console.log(res.data);

                setNotes(res.data.notes);

            }catch(err){
                console.log(err);
                throw new Error(err);
            }

        }

        fetchNotes();

    }, [])


    return(
        <div className="mother">
            <section className="notes-section">

                <Title/>

                <div className="notes-content">
                    {
                        notes?.length > 0 ? (

                            notes.map((n , i) => 
                                <NotesCard 
                                    key={i}
                                    noteDetails={n.details}
                                    icon={getIcon(n.types)}
                                    createdAt={n.createdAt}
                                    createdBy={n.createdBy}
                                    haveLink={n.notesLink ? true : false}
                                    link={n.notesLink}    
                                />
                            )
                        ) : (
                            <div>
                                No Notes
                            </div>
                        )
                    }
                </div>
            </section>
        </div>
    )
}

function getIcon(type){

    const fileType = {
        docs: "fa-file-at",
        reminder: "fa-sticky-note",
        pdf: "fa-file-pdf",
        code: "fa-file-code",
        database: "fa-database",
        notes: "fa-book-open",
        assignment: "fa-file-pen",
        bug: "fa-bug",
        archive: "fa-file-zipper"
    };

    return fileType[type] || "fa-file";

}




export default Notes;