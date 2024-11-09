const database = require("better-sqlite3");

module.exports = {
  insertInto,
  getTable,
  getRow,
  updateRow,
  deleteRow,
};

// dBase & table: String;
function getTable(dBase, table) {
  var users;
  try {
    const db = new database(dBase);
    users = db.prepare(`SELECT * FROM ${table}`).all();
    db.close();
  } catch (error) {
    console.log(error.message);
  }
  return users;
}
// console.log(getTable("./databases/main.db", "users"));

// database & table: String; user: Object;
// inserts all the attributes of user into the table;
// keys have to have the same names as the columns of the table in the db;
function insertInto(dBase, table, user) {
  const keys = Object.keys(user);
  const values = Object.values(user);
  var columns = "(";
  var qMarks = "(";
  for (let i = 0; i < keys.length; i++) {
    columns += keys[i];
    qMarks += "?";
    if (i != keys.length - 1) {
      columns += ", ";
      qMarks += ", ";
    }
  }
  columns += ")";
  qMarks += ")";
  var sql = `INSERT INTO ${table} ${columns} VALUES ${qMarks}`;
  try {
    const db = new database(dBase);
    db.prepare(sql).run(values);
    db.close();
  } catch (error) {
    // console.log(error.message);
    return error.message;
  }
  return "User added!";
}
// insertInto("./databases/main.db", "users", { email: "sajasdfasasdfdafsdd@sajas.com", username: "SajsdasdffadReal", password: "sdbyfsdyuhfg", data:"{}" });
// console.log(getTable("./databases/main.db", "users"));

// user is and object;
// key names of user have to be same as column names in table
function getRow(dBase, table, user) {
  const keys = Object.keys(user);
  const values = Object.values(user);
  var row;
  var info = "";
  for (let i = 0; i < keys.length; i++) {
    info += `${keys[i]} = ?`;
    if (i != keys.length - 1) {
      info += " AND ";
    }
  }
  try {
    const db = new database(dBase);
    row = db.prepare(`SELECT * FROM ${table} WHERE ${info}`).get(values);
    db.close();
  } catch (error) {
    // console.log(error.message);
    return error.message;
  }
  if (row == undefined) {
    return "user not found";
  }
  return row;
}
// console.log(getRow("./databases/main.db", "users", { username: "Sajad" }));

// user is to find the user;
// update is what you want to update; {email: "iwehfiushdf", name: "iwuehf"}
function updateRow(dBase, table, user, update) {
  const db = new database(dBase);
  const updateKeys = Object.keys(update);
  const updateValues = Object.values(update);
  const userKeys = Object.keys(user);
  const userValues = Object.values(user);
  var userInfo = "";
  var updateInfo = "";
  for (let i = 0; i < userKeys.length; i++) {
    userInfo += `${userKeys[i]} = ?`;
    if (i != userKeys.length - 1) {
      userInfo += " AND ";
    }
  }
  for (let i = 0; i < updateKeys.length; i++) {
    updateInfo += `${updateKeys[i]} = ?`;
    if (i != updateKeys.length - 1) {
      updateInfo += " AND ";
    }
  }
  var sql = `UPDATE ${table} SET ${updateInfo} WHERE ${userInfo}`;
  db.prepare(sql).run(updateValues.concat(userValues));
  db.close();
}
// updateRow("./databases/main.db", "users", { username: "Sajad" }, { uid: "23" });
// console.log(getTable("./databases/main.db", "users"));

function deleteRow(dBase, table, user) {
  const keys = Object.keys(user);
  const values = Object.values(user);
  var columns = "(";
  for (let i = 0; i < keys.length; i++) {
    columns += `${keys[i]} = ?`;
    if (i != keys.length - 1) {
      columns += " AND ";
    }
  }
  columns += ")";
  var sql = `DELETE FROM ${table} WHERE ${columns}`;
  try {
    const db = new database(dBase);
    db.prepare(sql).run(values);
    db.close();
  } catch (error) {
    console.log(error.message);
  }
}
// deleteRow("./databases/main.db", "users", { uid: 2 });
// console.log(getTable("./databases/main.db", "users"));

// const sqlite3 = require('sqlite3');

// module.exports = {
//     insertData,
//     getTable,
//     getRow
// }

// // Returns db, or throws an error
// function startConn (DBname) {
//     try {
//         var db = new sqlite3.Database('./databases/' + DBname + ".db", function (err) {
//             if (err) {
//                 throw err;
//             }
//         });
//         return db;
//     } catch(err) {
//         throw err;
//     }

// }

// // Throws error if not successful
// async function insertData(DBname, table, info)
// {
//     try {
//         var db = startConn(DBname);
//     } catch (err) {
//         throw err
//     }

//     var keys = Object.keys(info);
//     var values = Object.values(info);
//     var sql = "INSERT INTO " + table + " (";
//     for (let i = 0; i < keys.length; i++) {
//         sql += keys[i];
//         if (i != keys.length - 1) {
//         sql += ", ";
//         } else {
//         sql += ") VALUES (";
//         }
//     }

//     for (let i = 0; i < keys.length; i++) {
//         sql += "'" + values[i] + "'";
//         if (i != keys.length - 1) {
//         sql += ", ";
//         } else {
//         sql += ")";
//         }
//     }

//     try {
//         var returnData = await new Promise((resolve, reject) => {
//             db.run(sql, [], function(err) {
//                 if (err) {
//                     reject(err);
//                 }
//                 else {
//                     resolve("Successfully added new data!");
//                 }
//             });
//         });
//         db.close();
//         return returnData;
//     } catch(err) {
//         db.close();
//         throw err;
//     }

// }

// // Returns data as rows, throws error otherwise
// async function getTable(DBname, table) {
//     try {
//         var db = startConn(DBname);
//     } catch (err) {
//         throw err
//     }

//     var sql = "SELECT * FROM " + table;

//     try {
//         const returnData = await new Promise((resolve, reject) => {
//             db.all(sql, [], (err, rows) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(rows);
//                 }
//             });
//         });

//         db.close();
//         return returnData;
//     } catch (err) {
//         db.close();
//         throw err
//     }

// }

// function getRow(DBname, table, idrow, id) {

// }

// /*
// db.all(sql, params, callback); ---> Get all rows
// db.get(sql, params, callback); ---> Get first matching row
// /*

// /*
// async function getTable(table) {
//     const [rows] = await con.query("SELECT * FROM " + table);
//     return rows;
//   }

//   async function deleteRecord(info, table) {
//     var sql = "DELETE FROM " + table + " WHERE id = ? AND password = ?";
//     const result = await con.query(sql, [info.id, info.password]);
//     console.log("Number of records deleted: " + result[0].affectedRows);
//     console.log(await getTable(table));
//   }
//     */
