const https = require('https');
const mongoose = require("mongoose")
const express = require("express");
const { log } = require('console');


const { Schema } = mongoose;

var pokeModel = null

const app = express()
const port = 5000

app.listen(process.env.port || port, async () => {
  try {
    const x = await mongoose.connect('mongodb://localhost:27017/test')
    // await mongoose.connect('mongodb+srv://user1:629Iv5E4zQcfyTLR@cluster0.lbm8g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    mongoose.connection.db.dropDatabase();

    // mongoose.connection.db.dropDatabase();

  }
  catch (error) {
    console.log('db error');
  }

  var possibleTypes = []
  var pokeSchema = null

  https.get("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json", (res) => {
    var chunks = "";
    res.on("data", function (chunk) {
      chunks += chunk;
    });
    res.on("end", async (data) => {
      possibleTypes = JSON.parse(chunks)
      possibleTypes = await possibleTypes.map(element => element.english)
      // console.log(possibleTypes);
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
          'Speed Attack': Number,
          'Speed Defense': Number,
          "Speed": Number
        }
      })
      pokeModel = mongoose.model('pokemons', pokeSchema); // unicorns is the name of the collection in db


      // console.log(pokeModel);
      // console.log(possibleTypes);

      https.get("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json", function (res) {
        var chunks = "";
        res.on("data", function (chunk) {
          chunks += chunk;
        });
        res.on("end", function (data) {
          const arr = JSON.parse(chunks);
          arr.map(element => {
            //insert to db
            // console.log(element);
            element["base"]["Speed Attack"] = element["base"]["Sp. Attack"];
            delete element["base"]["Sp. Attack"];
            element["base"]["Speed Defense"] = element["base"]["Sp. Defense"];
            delete element["base"]["Sp. Defense"];
            pokeModel.findOneAndUpdate(element, {}, { upsert: true, new: true }, function (err, result) {
              if (err) console.log("11111111" + err);
              // saved!
              // console.log(result);
            });
          })
        })
      })
    });
  });
})

// app.get('/pokemonsAdvancedFiltering', async (req, res) => {
//   const pokemons = await pokeModel.find(req.query);
//   res.send(pokemons);
// })

app.get('/pokemonsAdvancedFiltering', async (req, res) => {
  const { id, 'base.HP': baseHP, type, name, sort, filteredProperty } = req.query
  let query = {}
  if (id) { query.id = id }

  if (baseHP) {
    query["base.HP"] = Number(baseHP)
  }

  if (type) {
    query.type = {
      $in: type.split(",").map(item => item.trim())
    }
  }
  console.log(query)
  const mongooseQuery = pokeModel.find(query);
  if (sort) {
    mongooseQuery.sort(sort)
  }
  if (filteredProperty) {
    mongooseQuery.select(filteredProperty.replace(/,/g, " ") + " -_id")
    // mongooseQuery.select("-_id")
  }
  const pokemons = await mongooseQuery;
  console.log(pokemons);
  res.send({
    hits: pokemons,
    page: 1,
    pageSize: 20
  });
})