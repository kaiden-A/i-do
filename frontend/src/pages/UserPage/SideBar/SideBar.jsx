import { useState } from "react";
import { useNavigate , useLocation, Link} from "react-router-dom";

function SideBar(){

    const navigate = useNavigate();
    const location = useLocation();

    const [open , setOpen] = useState(false);

    return(
        <>
        <button className="burger-btn"
            onClick={() => setOpen(!open)}    
        >
            <i className="fas fa-bars"></i>
        </button>

        <aside className={`sidebar ${open ? 'open' : ''}`}>
            <div className="logo">
                <div className="logo-icon">
                    <i className="fas fa-tasks"></i>
                </div>
                <span>i-Do</span>
            </div>
            
            <ul className="nav-menu">
                <li>
                    <Link to={'/dashboard'} 
                        className={`${location.pathname === '/dashboard' ? 'active' : ''}`}
                    >
                        <i className="fas fa-home"></i>Dashboard
                    </Link>
                </li>
                <li>
                    <Link to={'/studies'}
                        className={`${location.pathname === '/studies' ? 'active' : ''}`}
                    >
                        <i className="fas fa-users"></i>Study Groups
                    </Link>
                </li>
                <li>
                    <Link to={'/notes'}
                        className={`${location.pathname === '/notes' ? 'active' : ''}`}
                    >
                        <i className="fas fa-sticky-note"></i>Notes
                    </Link>
                </li>
                <li><a href="#"><i className="fas fa-cog"></i>Settings</a></li>
            </ul>
            
            <div className="user-profile">
                <div className="user-info">
                    <p>Made and develop by Kaiden-A</p>
                </div>
            </div>
        </aside>
        </>
    )
}

export default SideBar;