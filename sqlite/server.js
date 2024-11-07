// Import sqlite3 package
const sqlite3 = require('sqlite3');
// Create or connect to an SQLite database
const db = new sqlite3.Database('./databases/test.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

var sql = "INSERT INTO users(id, name, email) VALUES(?, ?, ?)"

db.run(sql, [1234, "John", "john@doe.com"], function(err) {
    if (err) {
        console.log(err);
    }
});

db.close()

