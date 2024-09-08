const express = require("express");
const morgan = require("morgan");

//imports
const {logIn} = require("./handlers/logIn")
const {signUp} = require("./handlers/signUp")

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

app.get("/*", (req, res) => {
    res.status(404).json({status: 404, message: "This isn't the endpoint you're looking for!"})
})

app.listen(PORT, () => {
    console.info("Server listening on port: ", PORT)
})