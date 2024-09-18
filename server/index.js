("use strict");

const express = require("express");
const morgan = require("morgan");

//imports
const {logIn} = require("./handlers/logIn")
const {signUp} = require("./handlers/signUp")
const {topGames} = require("./handlers/topGames")
const {latestGames} = require("./handlers/latestGames")
const {searchGames} = require("./handlers/searchGames")

const PORT = 8888;

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

//Test
app.get("/test", (req, res) => {
    res.send("Test passed!")
})

//Routes 
app.post("/login", logIn)
app.post("/signup", signUp)
app.post("/latestGames", latestGames)
// app.post("/latestGames", latestGames)
// app.post("/topGames", async (req,res) => {
//     try {
//         const games = await topGames()
//         res.json({games})
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// })
app.post("/topGames", topGames) 
// do i need the headers like in the project or no? 
//axios or normal - ex. getcompany vs topgames?
app.post("/searchGames", searchGames)

app.get("/*", (req, res) => {
    res.status(404).json({status: 404, message: "This isn't the endpoint you're looking for!"})
})

app.listen(PORT, () => {
    console.info("Server listening on port: ", PORT)
})