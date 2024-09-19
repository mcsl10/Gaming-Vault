
require("dotenv").config();
const {CLIENT_ID, ACCESS_TOKEN } = process.env;

const axios = require("axios"); //Make API request to IGDB

const searchGames = async (req, res) => {

  const { query } = req.body; //Get search query from frontend

  try {

    console.log(CLIENT_ID, ACCESS_TOKEN);
    //Fetch games from IGDB API based on the search query
    const response = await axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "text/plain",
      },
      data: `fields name, total_rating, platforms.name, first_release_date, cover.url ; 
        search "${query}";
      limit 100;`,
    });

    const games = response.data

    //Send games as a response to the frontend
    if (!games || games.length === 0) {
        res.status(404).json({status: 404, message: "No games found"})
    } else {
        res.status(200).json({status: 200, games})
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error fetching search results" });
  }
};

module.exports = {
  searchGames,
};
