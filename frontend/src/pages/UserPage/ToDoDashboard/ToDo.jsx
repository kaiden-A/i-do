import Header from "./components/Header";
import SearchBar from "./components/Search";
import ToDoCard from "./components/ToDoCard";
import "./styles/ToDo.css"

function ToDo(){

    return(
        <>

            <div className="mother">
                <Header/>

                <SearchBar/>

                <section className="task-board-section">
                    <ToDoCard/>
                    <ToDoCard/>
                </section>

            </div>
        </>
    )
}

export default ToDo;