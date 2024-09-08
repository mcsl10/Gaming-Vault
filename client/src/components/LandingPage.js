import { useState } from "react"
import { Link } from "react-router-dom"
import SignUp from "./SignUp"
import LogIn from "./LogIn"

const LandingPage = () => {
    const [showSignUp, setShowSignUp] = useState(false)

    const handleToggle = () => {
        setShowSignUp((prevState) => !prevState)
    }

    return (
        <>
        <h1>Gaming Vault</h1>
        <p>Brief explanation of the Web App</p>
        
        <Link to="signup">
        <button>Get Started</button>
        </Link>

        <Link to="login">
        <button>Already have an account? Log in</button>
        </Link>



        {/* {showSignUp ? (
            <div>
              <SignUp />  
              <p>Already have an account?{" "}
              <button onClick={handleToggle}>Log In</button>
              </p>
            </div>
        ) : (
            <div>
                <LogIn />
                <p>
                    Don't have an account?{" "}
                    <button onClick={handleToggle}>Register Now</button>
                </p>
            </div>
        )} */}
        
        </>
    )
}



export default LandingPage