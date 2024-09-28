const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const signUp = async (req, res) => {
    const client = new MongoClient(MONGO_URI)

    try {
        await client.connect()
        const db = client.db("Gaming_Vault")
        const {email, password} = req.body

        //Check if user already exists
        const existingUser = await db.collection("users").findOne({email})

        if (existingUser) {
            return res.status(400).json({message: "User already exists"})
        }

        //Convert password to a string
        const passwordAsString = String(password)

        //Insert new user into collection
        const result = await db.collection("users").insertOne({email, password: passwordAsString})

        // Get the inserted user ID
        const newUserId = result.insertedId;

        return res.status(201).json({
            message: "User registered successfully",
            user: {id: newUserId, email: email} //New user just created
        })
 
    } catch (error) {
        console.error(error)
        res.status(500).json({error})

    } finally {
        await client.close()
        console.log("Disconnected")
    }
}

module.exports = {signUp}
