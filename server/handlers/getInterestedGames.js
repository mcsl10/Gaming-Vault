const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

//Handler to fetch a user's interested games
const getInterestedGames = async (req, res) => {
    const client = new MongoClient(MONGO_URI)
    const { userId } = req.params;

    try {
        await client.connect();
        const db = client.db("Gaming_Vault");

        //Fetch the user based on userId
        const user = await db.collection("users").findOne({_id: new ObjectId(userId)});

        //If user is not found, return a 404
        if (!user) {
            return res.status(404).json({status: 404, message: "User not found"})
        }
        console.log("User found: ", user);

        //Return the interested games list
        res.status(200).json({status: 200, games: user.interested || []})

    } catch (error) {
        //Handle errors
        res.status(500).json({status: 500, message: error.message})
    } finally {
        await client.close()
    }
}

module.exports = {getInterestedGames}