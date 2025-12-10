import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";

function UserPage(){

    return(
        <>
            <div className="app-container" style={{display : "flex"}}>
                <SideBar/>
                <Outlet></Outlet>
            </div>
        </>
    )
}

export default UserPage;