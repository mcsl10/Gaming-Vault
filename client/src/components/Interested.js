import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

//React Icon
import { BallTriangle } from "react-loading-icons";

const Interested = ({ user }) => {
  const [games, setGames] = useState([]); //Local state to store games
  const [loading, setLoading] = useState(true); //State for loading status
  const [error, setError] = useState(null); //State for error handling

  //Fetch user's interested games when the component mounts
  useEffect(() => {
    const fetchInterestedGames = async () => {
      try {
        const response = await axios.get(`/interested/${user.id}`);
        if (response.status === 200) {
          setGames(response.data.games); //Set the games data
          console.log(response.data.games);// Log the games data to check the structure
        } else {
          setError("Failed to fetch games");
        }
      } catch (error) {
        setError(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.id) {
      fetchInterestedGames(); //Only fetch if the user and user._id exists
    } else {
      setLoading(false); // If no user, stop loading
      setError("Please log in");
    }
  }, [user]);

  //Handle loading state
  if (loading) {
    return (
      <LoadingMessage>
        <h2>
          Loading Games <BallTriangle />
        </h2>
      </LoadingMessage>
    );
  }

  //Handle error state
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

//---------------------------------------------------------------------------------------------
// Handler for playing now button (move game from interested to inprogress)
const handleMoveToInProgress = async (game) => {

  try{
    const response = await axios.patch("/moveToInProgress", {
      userId: user.id,
      game: game, //Send the full game object to the backend
    });

    if (response.status === 200) {
      // Remove the game from the interested list in the local state
      setGames((prevGames) => prevGames.filter((g) => g.id !== game.id)) //Use game.id here
      console.log("Game moved to in-progress:", response.data.message);
    } else {
      setError("Failed to move game to in-progress");
    }

  } catch (error) {
    console.error("Failed moving game to in-progress:", error);
    setError("Failed to move to inprogress")
  }
}
//---------------------------------------------------------------------------------------------
//Handler for deleting a game from the interested list
const handleDeleteInterestedGame = async (game) => {

  try { 
    const response = await axios.delete(`/interested/${user.id}/${game.id}`);

    if (response.status === 200) {
      //Remove the deleted game from the local state
      setGames((prevGames) => prevGames.filter((g) => g.id !== game.id));
      console.log("Game deleted from interested list:", response.data.message);
    } else {
      setError("Failed to delete the game from the interested list")
    }

} catch (error) {
console.error("Failed deleting the game from the interested list:", error);
setError("Failed to delete the game")
}
}
//---------------------------------------------------------------------------------------------
  return (
    <Container>
      <Title>On My Radar</Title>
      {games.length === 0 ? (
        <NoGamesMessage>No Games interests you?</NoGamesMessage>
      ) : (
        games.map((game) => (
          <GameItem key={game.id}>
            <GameTitle>{game.name}</GameTitle>
            <GameImage src={game.cover?.url} alt="Game Cover" width="100" />
            <ButtonsContainer>
            <PlayingNowButton onClick={() => handleMoveToInProgress(game)}>Playing Now</PlayingNowButton>
            <DeleteButton onClick={() => handleDeleteInterestedGame(game)}>Delete Game</DeleteButton>
            </ButtonsContainer>
          </GameItem>
        ))
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  color: lightgray;
`;

const NoGamesMessage = styled.p`
  text-align: center;
  font-size: 2rem;
  color: silver;
  margin: 3rem auto;
  border: 1px solid silver;
  width: 30rem;
  border-radius: 8px;
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
`;

const GameTitle = styled.h2`
  font-size: 1.4rem;
  margin: 0 0 0.62rem;
  text-align: center;
  color: lightgray;
`;

const GameImage = styled.img`
  width: 30%;
  border-radius: 4px;
  object-fit: contain;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const PlayingNowButton = styled.button`
  height: 2rem;
  margin-right: 1rem;
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

const DeleteButton = styled.button`
  height: 2rem;
  margin-right: 1rem;
  width: 10rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  font-size: 1.2rem;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  background-color: lightcoral;
  transition: font-size 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
  line-height: 0.5;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
    transform: scale(0.9);
  }
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 3rem;
`;

export default Interested;
