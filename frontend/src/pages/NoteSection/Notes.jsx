import NotesCard from "./components/NotesCard";
import Title from "./components/Title";
import "./styles/Notes.css"
import { useContext } from "react";
import { NotesContext } from "../Context/NotesContext";

function Notes(){

    const {notes} = useContext(NotesContext);

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