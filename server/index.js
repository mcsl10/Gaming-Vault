("use strict");

const express = require("express");
const morgan = require("morgan");

//imports
const {logIn} = require("./handlers/logIn")
const {signUp} = require("./handlers/signUp")
const {topGames} = require("./handlers/topGames")
const {latestGames} = require("./handlers/latestGames")
const {searchGames} = require("./handlers/searchGames")
const {specificGameInfo} = require("./handlers/specificGameInfo")
const {addToInterested} = require("./handlers/addToInterested")
const {getInterestedGames} = require("./handlers/getInterestedGames")
const {addToInProgress} = require("./handlers/addToInProgress")
const {getInProgressGames} = require("./handlers/getInProgressGames")
const {getCompletedGames} = require("./handlers/getCompletedGames")
const {moveToInProgress} = require("./handlers/moveToInProgress")
const {moveToCompleted} = require("./handlers/moveToCompleted")
const {moveBackToInProgress} = require("./handlers/moveBackToInProgress")
const {deleteInterestedGame} = require("./handlers/deleteInterestedGame")
const {deleteInProgressGame} = require("./handlers/deleteInProgressGame")
const {deleteCompletedGame} = require("./handlers/deleteCompletedGame")
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
// app.post(`/specificGame/${id}`, specificGameInfo)
app.get("/game/:id", specificGameInfo);

app.post("/addToInterested", addToInterested)
app.get("/interested/:userId", getInterestedGames)

app.post("/addToInProgress", addToInProgress)
app.get("/inprogress/:userId", getInProgressGames)


app.get("/completed/:userId", getCompletedGames)

app.patch("/moveToInProgress", moveToInProgress) //Playing Now Button
app.patch("/moveToCompleted", moveToCompleted) //Game Completed Button
app.patch("/moveBackToInProgress", moveBackToInProgress) //Playing Again Button

app.delete("/interested/:userId/:gameId", deleteInterestedGame)//Delete game in interested list
app.delete("/inprogress/:userId/:gameId", deleteInProgressGame)//Delete game in progress list
app.delete("/completed/:userId/:gameId", deleteCompletedGame)//Delete game in completed list

app.get("/*", (req, res) => {
    res.status(404).json({status: 404, message: "This isn't the endpoint you're looking for!"})
})

app.listen(PORT, () => {
    console.info("Server listening on port: ", PORT)
})