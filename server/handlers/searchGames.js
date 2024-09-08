const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;

const searchGames = () => {

}

module.exports = {
    searchGames,
}