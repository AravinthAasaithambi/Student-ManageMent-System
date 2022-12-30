let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
const application = express();
const PORT = process.env.PORT || 8080
const MONGODB_URI = 'mongodb+srv://student:student123@cluster0.aovuu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


const { MongoClient } = require("mongodb");
const connectionString = MONGODB_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db;
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};


