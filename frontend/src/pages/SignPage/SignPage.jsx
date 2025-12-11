import Login from "./components/Login"
import Signup from "./components/Signup"

import "./styles/SignPage.css"
function SignPage({login}){
    return(
        <div style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center'}}>
        <div className="auth-container">
            <div className="brand-panel">
                <div className="logo-container">
                    
                    <img src="/icon.png" alt="i-Do Logo" className="logo-img" id="logoImage"/>
                    <h1 className="brand-name">i-Do</h1>
                    <div className="brand-subtitle">Your Study Manager</div>
                    <p className="brand-tagline">Organize your studies, collaborate with peers, and achieve academic success</p>
                </div>
                
                <div className="brand-features">
                    <div className="feature">
                        <div className="feature-icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="feature-text">
                            <h4>Study Groups</h4>
                            <p>Create and manage collaborative study sessions</p>
                        </div>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">
                            <i className="fas fa-tasks"></i>
                        </div>
                        <div className="feature-text">
                            <h4>Task Management</h4>
                            <p>Track assignments, readings, and deadlines</p>
                        </div>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">
                            <i className="fas fa-share-alt"></i>
                        </div>
                        <div className="feature-text">
                            <h4>Resource Sharing</h4>
                            <p>Share notes, links, and materials with your group</p>
                        </div>
                    </div>
                </div>
            </div>
            {login ? <Login/> : <Signup/>}
        </div>
        </div>
    )
}

export default SignPage