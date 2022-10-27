const { mongoose } = require('mongoose')

const connectDB = async () => {
  try {
    const x = await mongoose.connect('mongodb://localhost:27017/test')
    console.log("Connected to db");
    mongoose.connection.db.dropDatabase();
    console.log("Dropped db");
    // get the data from Github 
  } catch (error) {
    console.log('db error');
  }
}

module.exports = { connectDB }