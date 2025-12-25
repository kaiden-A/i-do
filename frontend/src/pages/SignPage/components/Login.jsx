import { useState } from "react";
import { Link, useNavigate , useLocation } from "react-router-dom";
import axios from 'axios';

import Notifications from "../../Global/Notifications";

function Login(){

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [remember , setRemember] = useState(false);
    const [seePass , setSeePass] = useState(false);

    const [message , setMessage] = useState("");
    const [errBox , setErrBox] = useState(false);
    const [success , setSuccess] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const redirectTo = location.state?.redirectTo || "/dashboard";

    const handleForm = async (e) => {

        e.preventDefault();

        try{

            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login` , 
            { 
                email, password, remember

            },{
                withCredentials : true
            })

            if(!res.data.success){
                throw new Error(res.data.message);
            }

            navigate(redirectTo , {replace : true});
        }catch(err){

            console.error(err);
            
            setMessage(err.response?.data?.message || err.message || "Login failed");
            setSuccess(false);
            setErrBox(true);
            
        }
    }

    return(

        <>  
            <Notifications
                message={message}
                success={false}
                open={errBox}
                onClose={() => setErrBox(false)}
            />
            <div className="auth-panel">
                <div className="auth-header">
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Sign in to your i-Do account to continue your studies</p>
                </div>
                
                <form className="auth-form" onSubmit={handleForm}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="loginEmail">Email Address</label>
                        <input 
                            type="email" 
                            id="loginEmail" 
                            className="form-control" 
                            placeholder="student@university.edu" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
        
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label" htmlFor="loginPassword">Password</label>
                        <div className="password-container">
                            <input 
                                type={`${seePass ? "text" : "password"}`} 
                                id="loginPassword" 
                                className="form-control" 
                                placeholder="Enter your password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button    
                                type="button" 
                                className="toggle-password"
                                onClick={() => setSeePass(!seePass)}    
                            >
                                <i className={`${seePass ? "fas fa-eye-slash" : "fas fa-eye"}`}></i>
                            </button>
                        </div>
                    </div>
                    
                    <div className="form-options">
                        <div className="remember-me">
                            <input 
                                type="checkbox" 
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <a href="#" className="forgot-password" >Forgot password?</a>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                    >
                        <i className="fas fa-sign-in-alt"></i> Sign In
                    </button>
                    
                    <div className="divider"></div>
                    
                    
                    <div className="auth-switch">
                        Don't have an account?
                        <Link to={'/signup'} state={location.state}>Create account</Link>
                    </div>
                    
                    <div className="form-footer">
                        By signing in, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;