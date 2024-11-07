const sqlite3 = require('sqlite3');

module.exports = {
    insertData
}

function startConn (DBname) {
    // Create or connect to an SQLite database
    var db = new sqlite3.Database('./databases/' + DBname + ".db", (err) => {
    if (err) {
        return {
            "db": null,
            "response": err.message
        }
    }
  });
  return {
    "db": db,
    "response": 'Connected to the SQLite database.'
  }
}

function insertData(DBname, table, info)
{
    var response = startConn(DBname);
    console.log(response);
    var db = response["db"];
    if (db == null) return response["response"];

    var keys = Object.keys(info);
    var values = Object.values(info);
    var sql = "INSERT INTO " + table + " (";
    for (let i = 0; i < keys.length; i++) {
        sql += keys[i];
        if (i != keys.length - 1) {
        sql += ", ";
        } else {
        sql += ") VALUES (";
        }
    }

    for (let i = 0; i < keys.length; i++) {
        sql += "'" + values[i] + "'";
        if (i != keys.length - 1) {
        sql += ", ";
        } else {
        sql += ")";
        }
    }

    db.run(sql, [], function(err) {
        if (err) {
            db.close()
            return(err.message);
        }
    });

    db.close()
    return("Success!");
}


/*
async function getTable(table) {
    const [rows] = await con.query("SELECT * FROM " + table);
    return rows;
  }
  
  async function deleteRecord(info, table) {
    var sql = "DELETE FROM " + table + " WHERE id = ? AND password = ?";
    const result = await con.query(sql, [info.id, info.password]);
    console.log("Number of records deleted: " + result[0].affectedRows);
    console.log(await getTable(table));
  }
    */