const sqlite3 = require("sqlite3");
const transitLabels = require("./transitlabels.json");
const transitData = require("./transitdata.json");
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
const bodyParser = require("body-parser"); // For parsing JSON bodies
const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json()); // Middleware for JSON parsing

// Existing transit route endpoint (unchanged)
app.get("/transit/", function (req, res) {
  var requestData = req.body;
  res.set("Content-Type", "application/json");

  var routeObject = requestData["route_id"];
  console.log(routeObject);

  res.send({ routeObject: routeObject });
});

// Endpoint for getting transit locations based on shape IDs (fixed logic)
app.get("/transitlocations/", function (req, res) {
  const route_id = req.query.route_id;
  
  if (route_id && transitLabels[route_id]) {
    const shape_ids = transitLabels[route_id].shapeids;
    const longLat = shape_ids.map(id => transitData[id]).filter(Boolean); // Get longLat only if available

    res.send({ longLat: longLat });
  } else {
    res.status(400).send({ error: "Invalid or missing route_id" });
  }
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

// Route for handling signup (unchanged)
app.get("/signup/", (req, res) => {
  var user = req.query;
  user.data = JSON.stringify({ ...user.data, saved_routes: [], points: 0 });
  // console.log(user);
  const result = insertInto("./databases/main.db", "users", user);
  const resultArr = result.split(":");
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (resultArr[0] == "UNIQUE constraint failed") {
    // console.log("choose a different " + resultArr[1].split(".")[1]);
    res.send({ result: "choose a different " + resultArr[1].split(".")[1] });
  }
  res.send({ result: "User added!" });
});

// Start the server
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
