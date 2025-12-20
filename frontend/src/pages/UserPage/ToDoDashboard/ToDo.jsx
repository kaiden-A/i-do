import { useContext } from "react";
import { TaskContext } from "../../Context/TaskContext";
import Header from "./components/Header";
import SearchBar from "./components/Search";
import ToDoCard from "./components/ToDoCard";
import "./styles/ToDo.css"
import { useEffect } from "react";

function ToDo(){

    const {data} = useContext(TaskContext);

    return(
        <>

            <div className="mother">
                <Header/>

                <SearchBar/>

                <section className="task-board-section">
                    {
                        Object.entries(data?.userData || {}).map(([title , tasks]) => (

                            <ToDoCard
                                key={title}
                                title={title}
                                tasks={tasks}
                            />
                        ))
                    }
                </section>

            </div>
        </>
    )
}

export default ToDo;