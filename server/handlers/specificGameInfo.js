const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, CLIENT_ID, ACCESS_TOKEN } = process.env;

const axios = require("axios"); //Make API request to IGDB

const specificGameInfo = async (req,res) => {
    const client = new MongoClient(MONGO_URI);
    const { id } = req.params; //Extract game id 

    try {
        await client.connect()

    //Fetch specific game info from IGDB API
    const response = await axios({
        url: "https://api.igdb.com/v4/games",
        method: "POST",
        headers: {
            "Client-ID": CLIENT_ID,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "text/plain",
          },
          data: `fields name, total_rating, platforms.name, first_release_date, cover.url, 
          genres.name, involved_companies.company.name, involved_companies.developer, summary; 
          where id = ${id};`,
    })

//Without [0]: You get an array and accessing game properties will throw an error.
//With    [0]: You access the first element of the array (the game object) and can safely access its properties.
    const game = response.data[0] //Expect a single game with the given id

    //Send the game info as a response
    if (!game) {
        res.status(404).json({status: 404, message: "Game not found"})
    } else {
        res.status(200).json({status: 200, game})
    }


    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Error fetching game info" });

    } finally {
        await client.close();
        console.log("Disconnected");
    }
}

module.exports = {
    specificGameInfo,
}