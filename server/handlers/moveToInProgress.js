const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const moveToInProgress = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    const { userId, game} = req.body; // Extract userId,gameId and other game info from request body
    const gameId = game.id; //Get the gameId from the game object

    try {
        await client.connect();
        const db = client.db("Gaming_Vault");

    //Update the user's document by removing the game from "interested" and adding it to "inprogress"
    const result = await db.collection("users").updateOne(
        {_id: new ObjectId(userId) },
        {
            $pull: { interested: {id: gameId} }, //Remove the game from the "interested" array
            $push: { inprogress: game }  //Add the full game object to "inprogress" array
        }
    );

    //Check if the update was sucessfull
    if (result.modifiedCount === 0) {
        return res.status(404).json({message: "Game not found or already is in progress"})
    }

    res.status(200).json({status: 200, message: "Game moved to inprogress successfully"})
    console.log(result);


    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });

    } finally {
        await client.close()
    }
}

module.exports = { moveToInProgress }