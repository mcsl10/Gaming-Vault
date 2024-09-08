import { useState } from "react";
import { Link } from "react-router-dom"

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  };

//   try {
//     // const response = await fetch("http://localhost:8888/login")
//   }

  return (
    <form onSubmit={handleLogin}>
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
      <button type="submit">Log In</button>
    </form>
  );
};

export default LogIn;
