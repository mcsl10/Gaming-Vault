const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;


const logIn = async (req,res) => {
    const client = new MongoClient(MONGO_URI)


    try {
        await client.connect()
        const db = client.db("Gaming_Vault")
        const {email, password} = req.body

        //Find user with matching email/password
        const user = await db.collection("users").findOne({email, password})

        if (!user) {
            return res.status(400).json({status: 400, message: "Invalid credentials"})
        } else {
            return res.status(200).json({message: "Logged in"})
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({error})

    } finally {
        await client.close()
        console.log("Disconnected")
    }
}

module.exports = {logIn}