module.exports = {
    startConn
}

function startConn (DBname) {
    // Create or connect to an SQLite database
    var db = new sqlite3.Database('./databases/' + DBname + ".db", (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
        return {
            "db": db,
            "response": 'Connected to the SQLite database.'
        }
    }
  });
}


var sql = "INSERT INTO users(id, name, email) VALUES(?, ?, ?)"

db.run(sql, [1234, "John", "john@doe.com"], function(err) {
    if (err) {
        console.log(err);
    }
});

db.close()

