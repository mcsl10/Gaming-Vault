import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { BallTriangle } from "react-loading-icons";
import styled from "styled-components";

const SpecificGame = ({ game, setGame, addToInterested, addToInProgress, user }) => {
  const { id } = useParams(); //Get the game id from url
  // const [game, setGame] = useState(null); //Store game details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/game/${id}`);
        const data = await response.json();

        if (response.ok) {
          setGame(data.game);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message || "Error fetching game details");
      } finally {
        setLoading(false);
      }
    };
    fetchGameDetails();
  }, [id, setGame]);
//---------------------------------------------------------------------------------------------

  if (loading) {
    return (
      <LoadingContainer>
        <h2>
          Loading Game Details <BallTriangle />
        </h2>
      </LoadingContainer>
    );
  }

  if (error) {
    return <h2>{error}</h2>;
  }
//---------------------------------------------------------------------------------------------
  // Handler for adding to interested
  const handleInterestedClick = async () => {
    if (!user) {
      console.log(user);
      
      alert("Please log in to add games to your interested list.");
      return;
    }

    try {
      const response = await fetch("/addToInterested", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          game, // Passing the game object to add to interested list
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log(data.message); // Log success message
        alert("Game added to your Interested list!");

      } else {
        console.error(data.message); // Log error message
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding game to Interested:", error);
    }
  }
//---------------------------------------------------------------------------------------------
  // Handler for adding to in-progress
  const handleInProgressClick = async () => {
    if (!user) {
      console.log(user);
      
      alert("Please log in to add games to your in progress list.");
      return;
    }

    try {
      const response = await fetch("/addToInProgress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          game, // Passing the game object to add to in progress list
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log(data.message); // Log success message
        alert("Game added to your In Progress list!");

      } else {
        console.error(data.message); // Log error message
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding game to In Progress:", error);
    }
  }
  
//---------------------------------------------------------------------------------------------
  //Find the developer company from the involved_companies array
  const developerCompany = game.involved_companies?.find(
    (company) => company.developer
  )?.company?.name;

  //Extract genres and map over them to display genre name
  const genres = game.genres?.map((genre) => genre.name).join(", ") || "N/A";

  // Extract platforms and map over them to display platform names
  const platforms =
    game.platforms?.map((platform) => platform.name).join(", ") || "N/A";
//---------------------------------------------------------------------------------------------

  return (
    <GameContainer>
      <GameTitle>{game.name}</GameTitle>
      <GameImage src={game.cover?.url} alt={"Game Cover is not available"} />
      <ButtonsContainer>
        <InterestedButton onClick={handleInterestedClick}>
          Interested
        </InterestedButton>
        <PlayingButton onClick={handleInProgressClick}>
          Playing Now
        </PlayingButton>
      </ButtonsContainer>
      <GameInfo>
        <p>
          <StyledDescripton>Platforms:</StyledDescripton> {platforms}
        </p>
        <p>
          <StyledDescripton>Developer:</StyledDescripton>{" "}
          {developerCompany || "N/A"}
        </p>
        <p>
          <StyledDescripton>Release Date:</StyledDescripton>{" "}
          {new Date(game.first_release_date * 1000).toDateString()}
        </p>
        <p>
          <StyledDescripton>Genres:</StyledDescripton> {genres}
        </p>
        <p>
          <StyledDescripton>Rating:</StyledDescripton>{" "}
          {game.total_rating || "N/A"}
        </p>

        <p>{game.summary || "No descripton available"}</p>
      </GameInfo>
    </GameContainer>
  );
};

const GameContainer = styled.div`
  max-width: 50rem;
  margin: 5rem auto 0;
  padding: 1.25rem;
  border: 1px solid gray;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

const GameTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

const GameImage = styled.img`
  margin-bottom: 1rem;
  width: 20%;
  margin: 0 auto;
  border-radius: 2px;
  object-fit: contain;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const InterestedButton = styled.button`
  height: 2rem;
  margin-right: 1rem;
  width: 8rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  font-size: 1.2rem;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  background-color: springgreen;
  transition: font-size 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
  line-height: 0.5;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
    transform: scale(0.9);
  }
`;

const PlayingButton = styled.button`
  height: 2rem;
  width: 10rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  font-size: 1.2rem;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  background-color: aquamarine;
  transition: font-size 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
  line-height: 0.5;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
    transform: scale(0.9);
  }
`;

const GameInfo = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 1.2rem;
  color: lightgray;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p {
    margin: 0.5rem 0;
  }
`;

const StyledDescripton = styled.span`
  font-size: 1.3rem;
  color: gray;
  font-weight: 600;
  display: inline-block;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
`;

export default SpecificGame;
