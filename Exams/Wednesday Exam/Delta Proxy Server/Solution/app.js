const mongoose = require("mongoose")
const express = require("express")
const { connectDB } = require("./connectDB.js")
// const { populatePokemons } = require("./populatePokemons.js")
const { getSchema } = require("./getSchema.js")
const { handleErr } = require("./errorHandler.js")
const axios = require('axios')
const merge = require("merge-descriptors")
const app = express()
const port = 5000
var pokeModel = null;

const start = async () => {
  // console.log("starting the server");
  await connectDB();
  const pokeSchema = await getSchema();
  pokeModel = mongoose.model('pokemons', pokeSchema);
  // pokeModel = await populatePokemons(pokeSchema);

  app.listen(port, (err) => {
    // console.log("app.listen started");
    if (err) console.log(err);
    else
      console.log(`Phew! Server is running on port: ${port}`);
  })
}
start()



app.get('/api/v1/getPokemonswithRegex?', async (req, res) => {
  const { searchQuery } = req.query;
  if (!searchQuery) return res.status(400).json({ message: "Please provide a search query" })
  let regex_name = "\\w*"
  for (c of searchQuery) {
    if (c === '_')
      regex_name = regex_name.concat('\\w')
    else
      regex_name = regex_name.concat(c)
    console.log(regex_name);
    regex_name = regex_name.concat('\\w*')
  }
  const regex = new RegExp(regex_name, 'i');
  const res_ = await axios.get("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json")
  console.log(regex);
  const possibilities = res_.data.filter(({ name }) => regex.test(name.english))
  res.json(possibilities);
})

app.get('/api/v1/pokemons', async (req, res) => {
  try {
    const res_ = await axios.get("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json")
    Promise.all(
      res_.data.map(async element => {
        return new Promise(async (resolve, reject) => {
          const localPoke = await pokeModel.find({ "id": element.id })
          if (localPoke.length > 0) {
            resolve(mergePoke(localPoke, element))
          }
        })
      })).then(
        (result) => {
          // console.log(result);
          res.json(result);
        }
      )
    // const docs = await pokeModel.find({})
    //   .sort({ "id": 1 })
    //   .skip(req.query["after"])
    //   .limit(req.query["count"])
    // res.json(docs)
  } catch (err) { res.json(handleErr(err)) }
})

app.get('/api/v1/pokemon/:id', async (req, res) => {
  try {
    const { id } = req.params
    const res_ = await axios.get("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json")
    const remote_poke = res_.data.filter((doc) => doc.id == id)
    const localPoke = await pokeModel.find({ "id": id })
    if (localPoke.length > 0 && localPoke[0].deleted) {
      res.json({ errMsg: "Pokemon not found" })
      return
    }


    if (remote_poke.length != 0) {
      if (localPoke.length != 0) {
        const mergedPoke = mergePoke(localPoke, remote_poke)
        res.json(mergedPoke)
      } else
        res.json(remote_poke)
    } else if (localPoke.length != 0) {
      res.json(localPoke)
    }
    else res.json({ errMsg: "Pokemon not found" })
  } catch (err) { res.json(handleErr(err)) }
})

const mergePoke = (localPoke, remote_poke) => {
  for (key in localPoke) {
    remote_poke[key] = localPoke[key]
  }
  return remote_poke
}

app.use(express.json())


const putController = async (req, res) => {
  // try {
  const res_ = await axios.get("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json")
  const remote_poke = res_.data.filter((doc) => doc.id == req.params.id)
  if (remote_poke) {
    const selection = { id: req.params.id }
    const update = { ...req.body, deleted: false }
    const options = {
      new: true,
      runValidators: true,
      overwrite: true,
      upsert: true
    }
    const doc = await pokeModel.findOneAndUpdate(selection, update, options)
    res.json({
      msg: "Upserted Successfully",
      pokeInfo: doc
    })
  } else {
    res.json({
      msg: "Not found",
    })
  }
  // } catch (err) { res.json(handleErr(err)) }
}
app.post('/api/v1/pokemon/', putController)

app.delete('/api/v1/pokemon/:id', async (req, res) => {
  try {
    const res_ = await axios.get("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json")
    const remote_poke = res_.data.filter((doc) => doc.id == req.params.id)
    if (remote_poke) {
      // const docs = await pokeModel.findOneAndRemove({ id: req.params.id })
      const selection = { id: req.params.id }
      const update = { deleted: true, id: req.params.id }
      const options = {
        new: true,
        runValidators: true,
        upsert: true,
        overwrite: true // Rubric item minimals this will force to change the required fields in schema
      }
      const doc = await pokeModel.findOneAndUpdate(selection, update, options)
      res.json({
        msg: "Deleted Successfully"
      })
    }
    else
      res.json({
        errMsg: "Pokemon not found"
      })
  } catch (err) { res.json(handleErr(err)) }
})


app.put('/api/v1/pokemon/:id', putController)


app.patch('/api/v1/pokemon/:id', async (req, res) => {
  // try {
  // const res_ = axios.get("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json")
  // const remote_poke = res_.data.filter((doc) => doc.id == id)
  const localPoke = await pokeModel.find({ "id": req.params.id })
  const selection = { id: req.params.id }
  let update = req.body
  const options = {
    new: true,
    runValidators: true,
    upsert: true
  }
  if (localPoke.length > 0) {
    // merge local with changes
    const mergedPoke = mergePoke(localPoke, req.body)
    update = mergedPoke
  }
  update = { ...update, deleted: false }
  const updatedLocalPoke = await pokeModel.findOneAndUpdate(selection, update, options)
  res.json({
    msg: "Updated Successfully",
    pokeInfo: updatedLocalPoke
  })

  // if (remote_poke) {
  //   const selection = { id: req.params.id }
  //   const update = { ...req.body, deleted: false }
  //   const options = {
  //     new: true,
  //     runValidators: true
  //   }
  //   res.json({
  //     msg: "Updated Successfully",
  //     pokeInfo: localPoke
  //   })
  // } else {
  //   res.json({
  //     msg: "Not found",
  //   })
  // }
  // } catch (err) { res.json(handleErr(err)) }
})

app.get("*", (req, res) => {
  res.json({
    msg: "Improper route. Check API docs plz."
  })
})
