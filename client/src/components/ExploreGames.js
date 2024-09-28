import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BallTriangle } from "react-loading-icons";

const ExploreGames = () => {
  const [games, setGames] = useState([]); //State to store top games or latest games
  const [error, setError] = useState(null); //State to handle errors
  const [loading, setLoading] = useState(true); //State to track loading status
  const [currentView, setCurrentView] = useState("top"); //State to track which games to display (top or latest)

  //Function to fetch top or latest games based on the currentView
  const fetchGames = async (endpoint) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setGames(data.games);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message || "Error fetching games");
    } finally {
      setLoading(false);
    }
  };

  //Fetching games based on the current view
  useEffect(() => {
    if (currentView === "top") {
      fetchGames("/topGames");
    } else if (currentView === "latest") {
      fetchGames("/latestGames");
    }
  }, [currentView]);

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <Title>Discover Top and Newest Games</Title>

      {/* Toggle buttons */}
      <ButtonGroup>
        <TopGamesButton
          onClick={() => setCurrentView("top")}
          $activeview={currentView === "top"} // Highlight if currentView is "top"
        >
          Top Games
        </TopGamesButton>
        <LatestGamesButton
          onClick={() => setCurrentView("latest")}
          $activeview={currentView === "latest"} // Highlight if currentView is "latest"
        >
          New Games
        </LatestGamesButton>
      </ButtonGroup>

      {/* Display loading state when switching between top and newest games */}
      {loading ? (
        <LoadingContainer>
          <h2>
            Loading Games <BallTriangle />
          </h2>
        </LoadingContainer>
      ) : (
        <GameList>
          {games.length === 0 ? (
            <NoResultMessage>No Games Available</NoResultMessage>
          ) : (
            games.map((game) => (
              <StyledLink to={`/game/${game.id}`} key={game.id}>
              <GameItem key={game.id}>
                <GameTitle>{game.name}</GameTitle>
                <GameImage
                  src={game.cover?.url}
                  alt={"Game Cover is not available"}
                />
                <GamePlatforms>
                  {game.platforms?.map((platform) => platform.name).join(", ")}
                </GamePlatforms>
                <GameDetails>
                  <p>Current Rating: {game.total_rating || "N/A"}</p>
                  <p>
                    Release Date:{" "}
                    {new Date(game.first_release_date * 1000).toDateString()}
                  </p>
                </GameDetails>
              </GameItem>
              </StyledLink>
            ))
          )}
        </GameList>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: lightgray;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2.2rem;
`;

const TopGamesButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: ${(props) => (props.$activeview ? "1.3rem" : "1.2rem")}; /* Slightly bigger font when active */
  font-weight: ${(props) => (props.$activeview ? "700" : "600")}; /* Increase font weight when active */
  border-radius: 5px;
  border: ${(props) => (props.$activeview ? "none" : " 3px solid mediumspringgreen")}; /* Active border */
  color: ${(props) => (props.$activeview ? "black" : "mediumspringgreen")};
  transform: ${(props) => (props.$activeview ? "scale(1.07)" : "scale(1)")}; /* Increase size slightly when active */
  cursor: pointer;
  background-color: ${(props) => (props.$activeview ? "mediumspringgreen" : "transparent")};
  transition: opacity 0.3s ease, border 0.3s ease, transform 0.3s ease, font-size 0.3s ease, font-weight 0.3s ease;

  &:hover {
    /* opacity: 0.7; */
    background-color: mediumspringgreen;
    color: black;
  }
`;

const LatestGamesButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: ${(props) => (props.$activeview ? "1.3rem" : "1.2rem")}; /* Slightly bigger font when active */
  font-weight: ${(props) => (props.$activeview ? "700" : "600")}; /* Increase font weight when active */
  border-radius: 5px;
  border: ${(props) => (props.$activeview ? "none" : "3px solid aquamarine")}; /* Active border */
  color: ${(props) => (props.$activeview ? "black" : "aquamarine")};
  transform: ${(props) => (props.$activeview ? "scale(1.07)" : "scale(1)")}; /* Increase size slightly when active */
  cursor: pointer;
  background-color: ${(props) => (props.$activeview ? "aquamarine" : "transparent")};
  transition: opacity 0.3s ease, border 0.3s ease, transform 0.3s ease, font-size 0.3s ease, font-weight 0.3s ease;

  &:hover {
    /* opacity: 0.7; */
    background-color: aquamarine;
    color: black;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoResultMessage = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 3rem;
  color: lightgray;
  font-weight: 400;
`;

const GameList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const GameItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 15px;
  width: 30rem;
  height: 18rem;
  background-color: black;
  transition: font-size 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
  opacity: 0.96;

  &:hover {
    cursor: pointer;
    opacity: 1;
    transform: scale(0.9);
    background-color: #0f1011;
  }
`;

const GameTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0 0 0.62rem;
  text-align: center;
`;

const GameImage = styled.img`
  width: 30%;
  border-radius: 4px;
  object-fit: contain;
`;

const GamePlatforms = styled.p`
  margin-top: 0.5rem;
  text-align: center;
`;

const GameDetails = styled.div`
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: lightgray;
`;

const ErrorMessage = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 3rem;
`;

const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
`

export default ExploreGames;
