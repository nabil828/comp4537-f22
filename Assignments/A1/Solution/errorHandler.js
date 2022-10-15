const { mongoose } = require('mongoose')

function handleErr(err) {
  // console.log("err.name: ", err.name);
  if (err instanceof mongoose.Error.ValidationError) {
    return ({ errMsg: "ValidationError: check your ..." })
  } else if (err instanceof mongoose.Error.CastError) {
    return ({ errMsg: "CastError: check your ..." })
  } else {
    return ({ errMsg: err })
  }
}

module.exports = { handleErr }