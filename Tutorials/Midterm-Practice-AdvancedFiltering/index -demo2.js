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
          "Defense": Number,

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




app.get("/pokemonsAdvancedFiltering", async (req, res) => {
  const { id,
    "base.HP": baseHP,
    "base.Attack": baseAttack,
    "base.Defense": baseDefense,
    "base.Speed Attack": baseSpeedAttack,
    "base.Speed Defense": baseSpeedDefense,
    "base.Speed": baseSpeed,
    type,
    "name.english": nameEnglish,
    "name.japanese": nameJapanese,
    "name.chinese": nameChinese,
    "name.french": nameFrench,
    page,
    sort,
    filteredProperty,
    hitsPerPage
  } = req.query

  const query = {}
  if (id) query.id = Number(id)
  if (baseHP) query["base.HP"] = baseHP
  if (baseAttack) query["base.Attack"] = baseAttack
  if (baseDefense) query["base.Defense"] = Number(baseDefense)
  if (baseSpeedAttack) query["base.Speed Attack"] = baseSpeedAttack
  if (baseSpeedDefense) query["base.Speed Defense"] = baseSpeedDefense

  if (baseSpeed) query["base.Speed"] = baseSpeed
  if (nameEnglish) query["name.english"] = nameEnglish

  if (nameJapanese) query["name.japanese"] = nameJapanese
  if (nameChinese) query["name.chinese"] = nameChinese
  if (nameFrench) query["name.french"] = nameFrench
  if (page) page = Number(page)
  if (hitsPerPage) hitsPerPage = Number(hitsPerPage)

  if (type) query.type = { $in: type.split(",").map(element => element.trim()) }

  const mongooseQuery = pokeModel.find(query);

  if (sort)
    mongooseQuery.sort(sort)
  if (filteredProperty)
    mongooseQuery.select(filteredProperty.replace(/, /g, " ") + " -_id")

  const pokemons = await mongooseQuery;
  res.send({
    hits: pokemons,
    key: "asldkasdk"
  })
})


app.get('/api/v1/pokemons', async (req, res) => {
  // console.log(req.query["count"]);
  if (!req.query["count"])
    req.query["count"] = 10
  if (!req.query["after"])
    req.query["after"] = 0
  try {
    const docs = await pokeModel.find({})
      .sort({ "id": 1 })
      .skip(req.query["after"])
      .limit(req.query["count"])
    res.json(docs)
  } catch (err) { res.json(handleErr(err)) }
})

app.get('/api/v1/pokemon/:id', async (req, res) => {
  try {
    const { id } = req.params
    const docs = await pokeModel.find({ "id": id })
    if (docs.length != 0) res.json(docs)
    else res.json({ errMsg: "Pokemon not found" })
  } catch (err) { res.json(handleErr(err)) }
})

app.use(express.json())
app.post('/api/v1/pokemon/', async (req, res) => {
  try {
    const pokeDoc = await pokeModel.create(req.body)
    // console.log(pokeDoc);
    res.json({
      msg: "Added Successfully"
    })
  } catch (err) { res.json(handleErr(err)) }
})

app.delete('/api/v1/pokemon/:id', async (req, res) => {
  try {
    const docs = await pokeModel.findOneAndRemove({ id: req.params.id })
    if (docs)
      res.json({
        msg: "Deleted Successfully"
      })
    else
      res.json({
        errMsg: "Pokemon not found"
      })
  } catch (err) { res.json(handleErr(err)) }
})

app.put('/api/v1/pokemon/:id', async (req, res) => {
  try {
    const selection = { id: req.params.id }
    // const update = { $set: { "base.HP": req.body.HP } }
    const update = req.body
    const options = {
      new: true,
      runValidators: true,
      overwrite: true
    }
    const doc = await pokeModel.findOneAndUpdate(selection, update, options)
    // console.log(docs);
    if (doc) {
      res.json({
        msg: "Updated Successfully",
        pokeInfo: doc
      })
    } else {
      res.json({
        msg: "Not found",
      })
    }
  } catch (err) { res.json(handleErr(err)) }
})

app.patch('/api/v1/pokemon/:id', async (req, res) => {
  try {
    const selection = { id: req.params.id }
    // const update = { $set: { "base.HP": req.body.HP } }
    const update = req.body
    const options = {
      new: true,
      runValidators: true
    }
    const doc = await pokeModel.findOneAndUpdate(selection, update, options)
    // console.log(docs);
    if (doc) {
      res.json({
        msg: "Updated Successfully",
        pokeInfo: doc
      })
    } else {
      res.json({
        msg: "Not found",
      })
    }
  } catch (err) { res.json(handleErr(err)) }
})

app.get("*", (req, res) => {
  res.json({
    msg: "Improper route. Check API docs plz."
  })
})

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