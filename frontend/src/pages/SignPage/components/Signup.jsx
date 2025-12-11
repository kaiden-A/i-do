import { Link } from "react-router-dom";

function Signup(){

    return(
        <>
            <div className="auth-panel" id="signupPanel">
                <div className="auth-header">
                    <h2 className="auth-title">Create Account</h2>
                    <p className="auth-subtitle">Join i-Do to organize your studies and collaborate with peers</p>
                </div>
                
                <form className="auth-form" id="signupForm">
                    <div className="form-group">
                        <label className="form-label" htmlFor="signupUserId">Student ID</label>
                        <input type="text" id="signupUserId" className="form-control" placeholder="Choose a unique user ID" required/>
                        <div className="error-message" id="userIdError">User ID must be 3-20 characters (letters, numbers, underscores)</div>
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label" for="signupEmail">Email Address</label>
                        <input type="email" id="signupEmail" className="form-control" placeholder="student@university.edu" required/>
                        <div className="error-message" id="signupEmailError">Please enter a valid email address</div>
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label" for="signupPassword">Password</label>
                        <div className="password-container">
                            <input type="password" id="signupPassword" className="form-control" placeholder="Create a strong password" required/>
                            <button type="button" className="toggle-password" id="toggleSignupPassword">
                                <i className="far fa-eye"></i>
                            </button>
                        </div>
                        <div className="error-message" id="signupPasswordError">Password must be at least 8 characters with uppercase, lowercase, and number</div>
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                        <div className="password-container">
                            <input type="password" id="confirmPassword" className="form-control" placeholder="Re-enter your password" required/>
                            <button type="button" className="toggle-password" id="toggleConfirmPassword">
                                <i className="far fa-eye"></i>
                            </button>
                        </div>
                        <div className="error-message" id="confirmPasswordError">Passwords do not match</div>
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