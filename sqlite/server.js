// Import sqlite3 package
const sqlite3 = require('sqlite3');
const sqllib = require('./sql.js');

var result = sqllib.insertData("test", "asdas", {
  "id": 1234567,
  "name": "Bobby",
  "email": "bob@bob.com"
});

console.log(result)
