const mongoose = require("mongoose")
const { Schema } = mongoose;
const https = require('https');

const getTypes = () => {
  return new Promise((resolve, reject) => {
    https.get("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json", async (res) => {
      var chunks = "";
      res.on("data", function (chunk) {
        chunks += chunk;
      });
      res.on("end", async (data) => {
        possibleTypes = JSON.parse(chunks)
        possibleTypes = await possibleTypes.map(element => element.english)
        pokeSchema = new Schema({
          "id": {
            type: Number,
            unique: [true, "You cannot have two pokemons with the same id"]
          },
          "name": {
            "english": {
              type: String,
              required: true,
              maxLength: [20, "Name should be less than 20 characters long"]
            },
            "japanese": String,
            "chinese": String,
            "french": String
          },
          "type": possibleTypes,
          "base": {
            "HP": Number,
            "Attack": Number,
            "Defense": Number,
            'Speed Attack': Number,
            'Speed Defense': Number,
            "Speed": Number
          }
        })
        resolve(pokeSchema)
      })
    })
  })
}

module.exports = { getTypes }