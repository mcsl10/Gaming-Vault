const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, CLIENT_ID, ACCESS_TOKEN } = process.env;

const axios = require("axios"); //Make API request to IGDB

const latestGames = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect()

       // Get the current date
       const currentDate = Math.floor(Date.now() / 1000);
    
    //Fetch newest games from API
    const response = await axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "text/plain",
      },
      data: `fields name, total_rating, platforms.name, first_release_date, cover.url; 
      where first_release_date != null; 
      where first_release_date < ${currentDate}; 
      limit 300; sort first_release_date desc;`,
    });

    // console.log("Full API OBJECT", response);
    console.log("API response: ", response.data);

    const games = response.data;

    //Send the newest games as a response
    if (!games || games.length === 0) {
      res.status(404).json({ status: 404, message: "No latest games found" });
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
  latestGames,
};
