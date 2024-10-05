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
import ExploreGames from "./ExploreGames";
import SearchGames from "./SearchGames";
import Interested from "./Interested";
import InProgressGames from "./InProgressGames";
import CompletedGames from "./CompletedGames";
import NavBar from "./Navbar";

import SignUp from "./SignUp";
import LogIn from "./LogIn";
import SpecificGame from "./SpecificGame";
//---------------------------------------------------------------------------------------------
const App = () => {
  // State for user
  const [user, setUser] = useState(null);
  console.log(user);
  
  //State to store currently selected game and game sections
  const [selectedGame, setSelectedGame] = useState(null);
  const [interestedGames, setInterestedGames] = useState([]);
  const [inProgressGames, setInProgressGames] = useState([]);
  const [completedGames, setCompletedGames] = useState([]);


  // Handler to add a game to Interested list
  const handleAddToInterested = (game) => {
    setInterestedGames((prev) => [...prev, game]);
  };

  // Handler to add a game to In Progress list
  const handleAddToInProgress = (game) => {
    setInProgressGames((prev) => [...prev, game]);
  };

  // Handler to add a game to Completed list
  const handleAddToCompleted = (game) => {
    setCompletedGames((prev) => [...prev, game]);
  };


  return (
    <Router>
      <GlobalStyles />
      <NavBar user={user} setUser={setUser} />
      {/* {location.pathname !== "/" && <NavBar />} */}
      <Switch>
        {/* Landing Page with option to Sign up or Sign in */}
        <Route path="/" element={<LandingPage user={user} />} />
        {/* Sign Up Page */}
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        {/* Log In Page */}
        <Route path="/login" element={<LogIn setUser={setUser} />} />
        {/* Route to search games */}
        <Route path="/search" element={<SearchGames user={user} />} />
        {/* Route to display user potential interest in games */}
        <Route
          path="/interested"
          element={<Interested user={user} games={interestedGames} />}
        />
        {/* Route to display all games (Top 500 or Latest 500) */}
        <Route path="/explore" element={<ExploreGames user={user} />} />
        {/* Route to specific Game */}
        <Route
          path="/game/:id"
          element={
            <SpecificGame
              game={selectedGame}
              setGame={setSelectedGame}
              addToInterested={handleAddToInterested}
              addToInProgress={handleAddToInProgress}
              user={user}
            />
          }
        />
        {/* Route to display User's in-progress games */}
        <Route path="/in-progress" element={<InProgressGames user={user} games={inProgressGames} />} />
        {/* Route to display User's completed games */}
        <Route path="/completed" element={<CompletedGames user={user} games={completedGames} />} />
        {/* Route for non-existing url */}
        <Route path="/*" element={<h1 style={{textAlign: "center"}}>This page does not exist</h1>} />
      </Switch>
    </Router>
  );
};

export default App;
