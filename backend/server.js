const {
  createSession,
  authSession,
  removeSession,
} = require("./authentication/auth.js");
const {
  insertInto,
  getTable,
  getRow,
  updateRow,
  deleteRow,
} = require("./sql.js");

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
app.use(cors());

app.get("/signup/", (req, res) => {
  var user = req.query;
  user.data = JSON.stringify({ ...user.data, saved_routes: [], points: 0 });
  // console.log(user);
  const result = insertInto("./databases/main.db", "users", user);
  const resultArr = result.split(":");
  // console.log(resultArr);
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (resultArr[0] == "UNIQUE constraint failed") {
    // console.log("choose a different " + resultArr[1].split(".")[1]);
    res.send({ result: "choose a different " + resultArr[1].split(".")[1] });
  }
  res.send({ result: "User added!" });
});

app.get("/signin/", (req, res) => {
  var user = req.query;
  const row = getRow("./databases/main.db", "users", user);
  if (user.username == row.username && user.password == row.password) {
    createSession(row.uid)
      .then((authKey) => {
        console.log(authKey);
        res.send({ authKey: authKey });
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else {
    console.log("Wrong info");
    res.send({ result: "Wrong info!" });
  }
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

/* Sample getTable
sqllib.getTable("test", "users").then(function(result){
  console.log(result)
}).catch(function(err){
  console.log(err);
});


 Sample insertData
sqllib.insertData("test", "users", {
  "id": 1234567,
  "name": "Bobby",
  "email": "bsadob@bob.com"
}).catch(function(err) {
  console.log(err);
});
*/
