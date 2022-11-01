const express = require('express');
const app = express();
app.listen(5000, () => console.log('Server is listening on port 5000'));


class PokemonBadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = 'PokemonBadRequest';
  }
}

class PokemonBadRequestMissingID extends PokemonBadRequest {
  constructor(message) {
    super(message);
    this.name = 'PokemonBadRequestMissingID';
  }
}
class PokemonBadRequestMissingAfter extends PokemonBadRequest {
  constructor(message) {
    super(message);
    this.name = 'PokemonBadRequestMissingAfter';
  }
}


app.get('/pokemon', (req, res) => {
  if (req.query.id == undefined)
    throw new PokemonBadRequestMissingID('id is required');
  else if (req.query.after == undefined)
    throw new PokemonBadRequestMissingAfter('after is required');

  res.send("All good")
});

app.use((err, req, res, next) => {
  if (err instanceof PokemonBadRequestMissingAfter) {
    res.status(400).send(err.message);
  } else if (err instanceof PokemonBadRequestMissingID) {
    res.status(400).send(err.message);
  } else {
    res.status(500).send(err.message);
  }
})
