import Title from "./components/Title";
import "./styles/Notes.css"

function Notes(){
    
    return(
        <div className="mother">
            <section className="notes-section">

                <Title/>

                <div className="notes-content">
                    <div className="note-item">
                        <a href="https://docs.google.com/document/d/example1" target="_blank" className="note-link">
                            <i className="fas fa-file-alt"></i> React Hooks Study Guide
                        </a>
                        <div className="note-date">Added by Alex, Nov 5</div>
                    </div>
                    <div className="note-item">
                        <a href="https://www.figma.com/file/example" target="_blank" className="note-link">
                            <i className="fab fa-figma"></i> Project Wireframes
                        </a>
                        <div className="note-date">Added by Katie, Nov 8</div>
                    </div>
                    <div className="note-item">
                        <div className="note-text">
                            <i className="fas fa-sticky-note"></i> Meeting notes: We'll use JWT for authentication
                        </div>
                        <div className="note-date">Added by Robert, Nov 12</div>
                    </div>
                    <div className="note-item">
                        <a href="https://drive.google.com/drive/example" target="_blank" className="note-link">
                            <i className="fas fa-database"></i> Database Schema Diagrams
                        </a>
                        <div className="note-date">Added by Maria, Nov 14</div>
                    </div>
                </div>
            </section>
        </div>
    )
}




export default Notes;