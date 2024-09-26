const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, CLIENT_ID, ACCESS_TOKEN } = process.env;

const axios = require("axios"); //Make API request to IGDB

const topGames = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect()

    //Fetch top games from API
    const response = await axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "text/plain",
      },
      data: `fields name, total_rating, platforms.name, first_release_date, cover.url ; 
    where total_rating < 100 & total_rating <= 99.5 & first_release_date != null;
    limit 300; sort total_rating desc;`,
    });

    // console.log("Full API OBJECT", response);
    console.log("API response: ", response.data);

    const games = response.data;

    //Send the top games as a response
    if (!games || games.length === 0) {
      res.status(404).json({ status: 404, message: "No top-rated games found" });
    } else {
      res.status(200).json({ status: 200, games });
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error fetching games" });
  } finally {
    await client.close();
    console.log("Disconnected");
  }
};

module.exports = {
  topGames,
};
