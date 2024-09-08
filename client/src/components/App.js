import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

//Global Styles
import GlobalStyles from "../GlobalStyles";

//Components
import LandingPage from "./LandingPage";
import Home from "./Home";
import InProgressGames from "./InProgressGames";
import CompletedGames from "./CompletedGames";
import NavBar from "./Navbar";

import SignUp from "./SignUp";
import LogIn from "./LogIn";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <NavBar />
      {/* {location.pathname !== "/" && <NavBar />} */}
      <Switch>
        {/* Landing Page with option to Sign up or Sign in */}
        <Route path="/" element={<LandingPage />} />
        {/* Sign Up Page */}
        <Route path="/signup" element={<SignUp />} />
        {/* Log In Page */}
        <Route path="login" element={<LogIn />} />
        {/* Route to display all games (Top 500 or Latest 500) */}
        <Route path="/explore" element={<h1>Explore Games</h1>} />
        {/* Route to display User's in-progress games */}
        <Route path="/in-progress" element={<h1>In Progress</h1>} />
        {/* Route to display User's completed games */}
        <Route path="/completed" element={<h1>Completed Games</h1>} />
        {/* Route for non-existing url */}
        <Route path="/*" element={<h1>This page does not exist</h1>} />
      </Switch>
    </Router>
  );
};

export default App;
