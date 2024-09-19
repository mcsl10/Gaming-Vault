import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

//React Icons
import { MdOutlineSearch } from "react-icons/md";
import { BallTriangle } from "react-loading-icons";

const SearchGames = () => {
  //Store user input and search results
  const [query, setQuery] = useState(""); //State to store the query
  const [games, setGames] = useState([]); //State to store games
  const [searchPerformed, setSearchPerformed] = useState(false); //State to track if search was performed
  const [loading, setLoading] = useState(false); //State to track loading status

  //Handle user input
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  //Call the backend to search games
  const search = async () => {
    setLoading(true); //Set Loading to true when search starts

    try {
      const response = await axios.post("/searchGames", { query });
      setGames(response.data.games || []); // Ensure games is always an array, prevent any errors when trying to use games later.
      setSearchPerformed(true);
    } catch (error) {
      console.error("Error searching games:", error.message);
      setGames([]); // Set an empty array if the request fails, prevent any errors when trying to use games later.
      setSearchPerformed(true); // Mark that the search was performed even on error
    } finally {
      setLoading(false); //Set Loading to false when search is done
    }
  };

  //Make enter work as well (to do)
  return (
    <Container>
      <Title>Search for games</Title>
      <SearchBar>
        <Input
          type="text"
          placeholder="Search Games..."
          value={query}
          onChange={handleInputChange}
        />
        <Button onClick={search}>
          <MdOutlineSearch />
        </Button>
      </SearchBar>

      {/* Display loading message while games are loading */}
      {loading && (
        <LoadingContainer>
          <h2>
            Loading Games <BallTriangle />
          </h2>
        </LoadingContainer>
      )}

      {/* If No games were found */}
      {searchPerformed && games.length === 0 && !loading && (
        <NoResultMessage>No games found</NoResultMessage>
      )}

      {/* List all the games from the search */}
      {!loading && games.length > 0 && (
        <GameList>
          {games.map((game) => (
            <GameItem key={game.id}>
              <GameTitle>{game.name}</GameTitle>
              <GameImage src={game.cover?.url} alt={"Game Cover is missing"} />
              <GamePlatforms>
                {game.platforms?.map((platform) => platform.name).join(", ")}
              </GamePlatforms>
            </GameItem>
          ))}
        </GameList>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  //Figure out color
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2.2rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid lightgray;
  border-radius: 5px 0 0 5px;
  width: 12rem;
  font-size: 1.2rem;
`;

const Button = styled.button`
  padding: 0.5rem 0.8rem;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  background-color: springgreen;
  font-size: 1.5rem;
  line-height: 0.5;

  &:hover {
    opacity: 0.7;
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

export default SearchGames;
