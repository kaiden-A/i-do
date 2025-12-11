import { Link } from "react-router-dom";

function Login(){

    return(

        <>  
            <div className="auth-panel">
                <div className="auth-header">
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Sign in to your i-Do account to continue your studies</p>
                </div>
                
                <div className="success-message" id="signupSuccessMessage">
                    <i className="fas fa-check-circle"></i> Account created successfully! Please sign in.
                </div>
                
                <form className="auth-form" id="loginForm">
                    <div className="form-group">
                        <label className="form-label" htmlFor="loginEmail">Email Address</label>
                        <input type="email" id="loginEmail" className="form-control" placeholder="student@university.edu" required/>
                        <div className="error-message" id="loginEmailError">Please enter a valid email address</div>
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label" htmlFor="loginPassword">Password</label>
                        <div className="password-container">
                            <input type="password" id="loginPassword" className="form-control" placeholder="Enter your password" required/>
                            <button type="button" className="toggle-password" id="toggleLoginPassword">
                                <i className="far fa-eye"></i>
                            </button>
                        </div>
                        <div className="error-message" id="loginPasswordError">Password must be at least 8 characters</div>
                    </div>
                    
                    <div className="form-options">
                        <div className="remember-me">
                            <input type="checkbox" id="rememberMe"/>
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <a href="#" className="forgot-password" >Forgot password?</a>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">
                        <i className="fas fa-sign-in-alt"></i> Sign In
                    </button>
                    
                    <div className="divider"></div>
                    
                    
                    <div className="auth-switch">
                        Don't have an account?
                        <Link to={'/signup'}>Create account</Link>
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