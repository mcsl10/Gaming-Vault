const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
console.log(MONGO_URI);

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

        //Insert new user into collection
        await db.collection("users").insertOne({email, password})
        res.status(201).json({message: "User registered successfully"})
 
    } catch (error) {
        console.error(error)
        res.status(500).json({error})

    } finally {
        await client.close()
        console.log("Disconnected")
    }
}

module.exports = {signUp}
