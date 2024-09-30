const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const addToInProgress = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const { userId, game } = req.body;
  console.log(userId);
  console.log(req.body);

    try {
    await client.connect()
    const db = client.db("Gaming_Vault")

    //Validate userId before converting it 
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ status: 400, message: "Invalid user ID" });
      }

    // Fetch the user to check if they exist
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });

    if (!user) {
        return res.status(404).json({ status: 404, message: "User not found" });
      }


               // Check if the game is already in the in progress list
    if (user.inprogress && user.inprogress.includes(game)) {
        return res.status(400).json({
          status: 400,
          message: "Game is already in the in progress list",
        });
      }

          //Update the user document by adding the game to the in progress array
    const result = await db.collection("users").updateOne(
        { _id: new ObjectId(userId) }, // Convert userId to ObjectId if it's stored as ObjectId in MongoDB
        { $addToSet: { inprogress: game } } // $addToSet prevents duplicate entries
      );

      if (result.modifiedCount === 1) {
        res
          .status(200)
          .json({ status: 200, message: "Game added to in progress list" });
      } else {
        res
          .status(500)
          .json({
            status: 500,
            message: "Failed to update the in progress list",
          });
      }

    } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
    } finally {
      await client.close();
    }
};

module.exports = { addToInProgress }

