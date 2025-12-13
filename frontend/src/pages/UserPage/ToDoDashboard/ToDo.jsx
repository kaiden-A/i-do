import Header from "./components/Header";
import ToDoCard from "./components/ToDoCard";
import "./styles/ToDo.css"

function ToDo(){

    return(
        <>

            <div className="mother">
                <Header/>

                <div className="search-filter">
                    <form>
                        <input 
                            type="text"
                            placeholder="Search for a group..."
                        />
                    </form>
                    <button className="btn btn-primary">SEARCH</button>
                </div>

                <section className="task-board-section">
                    <ToDoCard/>
                    <ToDoCard/>
                </section>

            </div>
        </>
    )
}

export default ToDo;