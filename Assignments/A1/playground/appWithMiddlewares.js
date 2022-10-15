const https = require('https');
const mongoose = require("mongoose")
const express = require("express")
const url = "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json"

const { Schema } = mongoose;

var pokeModel = null

const app = express()
const port = 5000

app.listen(port, async () => {
  // 1 - establish the connection the db
  // 2 - create the schema
  // 3 - create the model
  // 4 - populate the db with pokemons
  try {
    const x = await mongoose.connect('mongodb://localhost:27017/test')
    mongoose.connection.db.dropDatabase();
  } catch (error) {
    console.log('db error');
  }

  var possibleTypes = []
  var pokeSchema = null

  // grab the types
  await https.get("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json", async (res) => {
    var chunks = "";
    res.on("data", function (chunk) {
      chunks += chunk;
    });
    await res.on("end", async (data) => {
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
          'Speed Attack': Number,
          'Speed Defense': Number,
          "Speed": Number
        }
      })
      // pokeSchema.index({ "id": 1 }); // schema level
      pokeModel = mongoose.model('pokemons', pokeSchema); // unicorns is the name of the collection in db
    });
  })
  // console.log(possibleTypes);

  // grab the pokemons
  https.get(url, function (res) {
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
          if (err) console.log(err);
          // saved!
          // console.log(result);
        });
      })
    })
  })
})



// app.use((req, res, next) => {
//   console.log('Time:', Date.now())
//   next()
// })


// app.use((req, res, next) => {
//   console.log('req url:', req.originalUrl)
//   next()
// })

const asyncWrapper = require('./middleware/async')

// app.use(asyncWrapper)
app.get('/api/v1/pokemons', asyncWrapper(async (req, res) => {
  const docs = await pokeModel.find({})
  res.json(docs)
}))

app.get('/api/v1/pokemon/:id', asyncWrapper, (async (req, res) => {
  console.log("2321");
  const docs = await pokeModel.find({ "id": id })
  res.json()
}))

app.use(express.json())
app.post('/api/v1/pokemon/', asyncWrapper(async (req, res) => {
  const pokeDoc = await pokeModel.create(req.body)
  res.json()
}))

app.delete('/api/v1/pokemon/:id', asyncWrapper(async (req, res) => {
  const docs = await pokeModel.findOneAndRemove({ id: req.params.id })
  res.json()
}))

app.put('/api/v1/pokemon/:id', asyncWrapper(async (req, res) => {

  const doc = await pokeModel.findOneAndUpdate(selection, update, options)

  res.json()
}))

app.patch('/api/v1/pokemon/:id', asyncWrapper(async (req, res) => {

  const doc = await pokeModel.findOneAndUpdate(selection, update, options)

  res.json()
}))






function handleErr(err) {
  console.log(err);
  if (err instanceof mongoose.Error.ValidationError) {
    return ({ errMsg: "ValidationError: check your ..." })
  } else if (err instanceof mongoose.Error.CastError) {
    return ({ errMsg: "CastError: check your ..." })
  } else {
    return ({ errMsg: err })
  }
}