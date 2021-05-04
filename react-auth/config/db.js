const mongoose = require('mongoose');
require('dotenv').config();

const db = process.env.MONGO_URL;
mongoose.set('useCreateIndex', true);

const connectDB = async () => {
  mongoose.connect('mongodb://localhost:27017/project',{
      useNewUrlParser: true
  })
  console.log("MongoDB connected.......")
};

module.exports = connectDB;
