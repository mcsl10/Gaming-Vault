const express = require("express");
const morgan = require("morgan");
// const {MongoClient} = require("mongodb")
// require("dotenv").config()
// others are in batchimport
// const {MONGO_URI} = process.env

const PORT = 8888;

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.get("/test", (req, res) => {
    res.send("Test passed!")
})

app.get("/*", (req, res) => {
    res.status(404).json({status: 404, message: "This isn't the endpoint you're looking for!"})
})

app.listen(PORT, () => {
    console.info("Server listening on port: ", PORT)
})