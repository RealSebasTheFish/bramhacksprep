const sqlite3 = require('sqlite3');

module.exports = {
    insertData,
    getTable,
    getRow
}

// Returns db, or throws an error
function startConn (DBname) {
    try {
        var db = new sqlite3.Database('./databases/' + DBname + ".db", function (err) {
            if (err) {
                throw err;
            }
        });
        return db;
    } catch(err) {
        throw err;
    }
    
}


// Throws error if not successful
async function insertData(DBname, table, info)
{
    try {
        var db = startConn(DBname);
    } catch (err) {
        throw err
    }

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

    
    try {
        var returnData = await new Promise((resolve, reject) => {
            db.run(sql, [], function(err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve("Successfully added new data!");
                }
            });
        });
        db.close();
        return returnData;
    } catch(err) {
        db.close();
        throw err;
    }
    

    
}

// Returns data as rows, throws error otherwise
async function getTable(DBname, table) {
    try {
        var db = startConn(DBname);
    } catch (err) {
        throw err
    }

    var sql = "SELECT * FROM " + table;
    
    try {
        const returnData = await new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        db.close();
        return returnData;
    } catch (err) {
        db.close();
        throw err
    }
    
}

function getRow(DBname, table, idrow, id) {

}

/*
db.all(sql, params, callback); ---> Get all rows
db.get(sql, params, callback); ---> Get first matching row
/*

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