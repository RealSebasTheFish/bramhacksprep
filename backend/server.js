const sqlite3 = require("sqlite3");
const transitLabels = require("./transitlabels.json");
const transitData = require("./transitdata.json");
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
const PORT = 3010;
app.use(cors());

app.get("/signup/", (req, res) => {
  const user = req.query;
  const result = insertInto("./databases/main.db", "users", user);
  const resultArr = result.split(":");
  // console.log(resultArr);
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (resultArr[0] == "UNIQUE constraint failed") {
    console.log("choose a different " + resultArr[1].split(".")[1]);
    res.send({ result: "choose a different " + resultArr[1].split(".")[1] });
  }
  console.log(result);
  res.send({ result: "user added" });
});

app.get("/transit/", function (req, res) {
  //gets the information from user, then the object associated with the route_id
  var requestData = req.body;
  res.set("Content-Type", "application/json");

  var routeObject = requestData["route_id"];
  console.log(routeObject);

  res.send({ routeObject: routeObject });
});

app.get("/transitlocations/", function (req, res) {
  //gets the shape id, then the longLat
  var shape_ids = transitLabels[route_id].shapeids;
  var longLat = transitData[shape_ids];

  res.send({ longLat: longLat });
});

// deleteRow("./databases/main.db", "users", { uid: 1 });
// console.log(getTable("./databases/main.db", "users"));

app.post("/signin/", (req, res) => {});

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
