import { useState } from "react";
import { Link } from "react-router-dom"

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  // const [status, setStatus] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    //Handle sign-up logic here (send request to backend)
  };

  return (
    <form onSubmit={handleSignUp}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="youremail@here.com"
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="********"
        required
      />
      <Link to ="/explore">
      <button type="submit">Sign Up</button>
      </Link>
    </form>
  );
};

export default SignUp;
