import { useContext } from "react";
import { TaskContext } from "../../Context/TaskContext";
import Header from "./components/Header";
import SearchBar from "./components/Search";
import ToDoCard from "./components/ToDoCard";
import "./styles/ToDo.css"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ToDo(){

    const {data} = useContext(TaskContext);
    const location = useLocation();

    

    useEffect(() => {
        if (location.hash) {
            // Escape special characters in hash
            const id = location.hash.slice(1); // remove #
            const el = document.querySelector(`#${CSS.escape(id)}`);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location , data]);

    return(
        <>

            <div className="mother">
                <Header/>

                <SearchBar/>

                <section className="task-board-section">
                    {
                        Object.entries(data?.userData || {}).map(([title , tasks]) => (

                            

                            <ToDoCard
                                key={tasks[0]?.groupId}
                                title={title}
                                tasks={tasks}
                                groupId={tasks[0]?.groupId}
                                members={data?.members[title]}
                                
                            />
                        ))
                    }
                </section>

            </div>
        </>
    )
}

export default ToDo;