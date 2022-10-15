const https = require('https');
const mongoose = require("mongoose")
const express = require("express")


const { Schema } = mongoose;

var pokeModel = null

const app = express()
const port = 5000

app.listen(process.env.port || port, async () => {
  try {
    const x = await mongoose.connect('mongodb://localhost:27017/test')
    // await mongoose.connect('mongodb+srv://user1:629Iv5E4zQcfyTLR@cluster0.lbm8g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    await mongoose.connection.db.dropDatabase();

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
  // default values 
  // let page = 1
  // let hitsPerPage = 5

  const { id,
    'name.english': nameEnglish,
    'name.chinese': nameChinese,
    'name.japanese': nameJapanese,
    'name.french': nameFrench,
    'base.HP': baseHP,
    'base.Attack': baseAttack,
    'base.Speed Attack': baseSpeedAttack,
    'base.Speed Defense': baseSpeedDefense,
    'base.Speed': baseSpeed,
    type, sort, filteredProperty } = req.query
  var { page, hitsPerPage } = req.query
  // console.log(page, hitsPerPage);
  // console.log(req.query)
  const query = {}
  if (id) query.id = id

  if (nameEnglish) query['name.english'] = nameEnglish
  if (nameChinese) query['name.chinese'] = nameChinese
  if (nameJapanese) query['name.japanese'] = nameJapanese
  if (nameFrench) query['name.french'] = nameFrench
  if (baseHP) query['base.HP'] = baseHP
  if (baseAttack) query['base.Attack'] = baseAttack
  if (baseSpeedAttack) query["base.Speed Attack"] = Number(baseSpeedAttack)
  if (baseSpeedDefense) query["base.Speed Defense"] = baseSpeedDefense
  if (baseSpeed) query['base.Speed'] = baseSpeed


  if (type) {
    const types = type.split(',').map(item => item.trim())
    // console.log(types);
    query.type = { $in: types }
    // console.log(query);
  }

  let results = pokeModel.find(query)
  let pokemons = []
  page = page || 1
  hitsPerPage = hitsPerPage || 5
  // console.log(page, hitsPerPage);
  beforePagination = await pokeModel.find(query)
  if (page) {
    pokemons = results.skip((page - 1) * hitsPerPage).limit(hitsPerPage);
  }
  if (sort) {
    pokemons = results.sort(sort.split(',').join(' '))
  }
  if (filteredProperty) {
    pokemons = results.select(filteredProperty.split(',').join(' ') + ' -_id')
  }
  pokemons = await results

  res.send({
    hits: pokemons,
    page: page,
    nbHits: pokemons.length,
    nbPages: Math.ceil(beforePagination.length / hitsPerPage),
    hitsPerPage: hitsPerPage,
    query: query,
    params: req.url.substring(req.url.indexOf('?') + 1)
  });
})