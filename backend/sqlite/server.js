const sqlite3 = require('sqlite3');
const sqllib = require('./sql.js');

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors())

app.listen()

// Sample getTable
sqllib.getTable("test", "users").then(function(result){
  console.log(result)
}).catch(function(err){
  console.log(err);
});


// Sample insertData
sqllib.insertData("test", "users", {
  "id": 1234567,
  "name": "Bobby",
  "email": "bsadob@bob.com"
}).catch(function(err) {
  console.log(err);
});


