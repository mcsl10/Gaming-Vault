const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, CLIENT_ID, ACCESS_TOKEN} = process.env;

const axios = require("axios") //Make API request to IGDB

const topGames = async () => {
    const client = new MongoClient(MONGO_URI)

    try {

    //Fetch top games from API
const response = await axios({
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
        'Client-ID': CLIENT_ID,
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'text/plain',
    },
    data: `fields name, total_rating, platforms.name, first_release_date, cover.url ; 
    where total_rating != null;
    limit 10; sort total_rating desc;`
});

// console.log("Full API OBJECT", response);
console.log("API response: ", response.data);

const games = response.data
//Return the top games
return games

    } catch (error) {
        console.error("Error fetching games:", error.message)
        throw new Error('Error fetching games from IGDB API');

    } finally {
        await client.close()
        console.log("Disconnected")
    }
}

topGames()

module.exports = {
    topGames,
}