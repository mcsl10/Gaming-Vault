const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;

const getGames = () => {
    const client = new MongoClient(MONGO_URI)



}

module.exports = {
    getGames
}