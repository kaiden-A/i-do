import axios from "axios";
import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import Notifications from "../../Global/Notifications";

function Signup(){

    const [email , setEmail] = useState("");
    const [userId , setUserId] = useState("");
    const [password , setPassword] = useState("");
    const [confirmPass , setConfirmPass] = useState("");
    const [name , setName] = useState("");

    const [seePass , setSeePass] = useState(false);
    const [seeConfirm , setSeeConfirm] = useState(false);

    const [msg , setMsg] = useState("");
    const [errBox , setErrBox] = useState(false);
    const [succBox , setSuccBox] = useState(false);

    const navigate = useNavigate();

    const sendForm = async (e) => {

        e.preventDefault();

        if(password !== confirmPass){
            setMsg("Confirm password doesnt match");
            setErrBox(true);
        }

        try{

            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup` , 
                {userId , name , email , password},
                {withCredentials : true}
            );


            if(res.data.success){
                navigate('/dashboard');
            }


        }catch(err){
            
            console.log(err);

            if(err.response){
                setMsg(err.response.data.message || "Something went wrong");
                setErrBox(true);
            } else {
                setMsg("Server not reachable");
                setErrBox(true);
            }
        }

    }
    
    return(
        <>
            <Notifications
                open={succBox}
                message={msg}
                onClose={() => setSuccBox(false)}
                success={true}
            />
            <Notifications
                open={errBox}
                message={msg}
                onClose={() => setErrBox(false)}
                success={false}
            />
            <div className="auth-panel" id="signupPanel">
                <div className="auth-header">
                    <h2 className="auth-title">Create Account</h2>
                    <p className="auth-subtitle">Join i-Do to organize your studies and collaborate with peers</p>
                </div>
                
                <form className="auth-form" onSubmit={sendForm}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="signupUserId">Student ID</label>
                        <input 
                            type="text" 
                            id="signupUserId" 
                            className="form-control" 
                            placeholder="Choose a unique user ID" 
                            required
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label" htmlFor="signupEmail">Email Address</label>
                        <input 
                            type="email" 
                            id="signupEmail" 
                            className="form-control" 
                            placeholder="student@university.edu" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            className="form-control" 
                            placeholder="Farhana binti Abdullah" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="signupPassword">Password</label>
                        <div className="password-container">
                            <input 
                                type={`${seePass ? "text" : "password"}`} 
                                id="signupPassword" 
                                className="form-control" 
                                placeholder="Create a strong password" 
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
                    
                    <div className="form-group">
                        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                        <div className="password-container">
                            <input 
                                type={`${seeConfirm ? "text" : "password"}`} 
                                id="confirmPassword" 
                                className="form-control" 
                                placeholder="Re-enter your password" 
                                required
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}    
                            />
                            <button 
                                type="button" 
                                className="toggle-password" 
                                onClick={() => setSeeConfirm(!seeConfirm)}    
                            >
                                <i className={`${seeConfirm ? "fas fa-eye-slash" : "fas fa-eye"}`}></i>
                            </button>
                        </div>

                    </div>
                    
                    <div className="form-group">
                        <div className="remember-me">
                            <input type="checkbox" id="acceptTerms" required/>
                            <label htmlFor="acceptTerms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
                        </div>
                        <div className="error-message" id="termsError">You must accept the terms and conditions</div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">
                        <i className="fas fa-user-plus"></i> Create Account
                    </button>
                    
                    <div className="divider">
                    </div>
                    
                    
                    <div className="auth-switch">
                        Already have an account?
                        <Link to={'/login'} >Sign in here</Link>
                    </div>
                </form>
            </div>
    
        </>
    )

}




export default Signup;