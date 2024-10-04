const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const deleteCompletedGame = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    const {userId, gameId} = req.params; //Extract userId and gameId from URL

    try {
        await client.connect();
        const db = client.db("Gaming_Vault")

        //Validate userId before converting it
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({status: 400, nessage: "Invalid user ID"});
        }

        //Fetch the user to check if they exist
        const user = await db.collection("users").findOne({_id: new ObjectId(userId)});

        if (!user) {
            return res.status(404).json({status: 404, message: "User not found"});
        }

        //Check if the game exists in the interested list
        const gameExists = user.completed.some(game => game.id.toString() === gameId)

        if (!gameExists) {
            return res.status(400).json({status: 400, message: "Game not found in the completed list"})
        }

        //Remove the game from the interested list
        const result = await db.collection("users").updateOne(
            {_id: new ObjectId(userId) },
            {$pull: {completed: {id: parseInt(gameId)} } } //Using parseInt since gameId is an integer
        );

        if (result.modifiedCount ===1) {
            res.status(200).json({status: 200, message: "Game removed from the completed list"})
        } else {
            res.status(500).json({status: 500, message: "Failed to remove the game from completed list"})
        }

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    } finally {
        await client.close()
    }
}

module.exports = { deleteCompletedGame }