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
const bodyParser = require("body-parser"); // For parsing JSON bodies
const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json()); // Middleware for JSON parsing

// Route for handling signup (unchanged)
app.get("/signup/", (req, res) => {
  const user = req.query;
  const result = insertInto("./databases/main.db", "users", user);
  const resultArr = result.split(":");
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (resultArr[0] == "UNIQUE constraint failed") {
    console.log("choose a different " + resultArr[1].split(".")[1]);
    res.send({ result: "choose a different " + resultArr[1].split(".")[1] });
  }
  console.log(result);
  res.send({ result: "user added" });
});

// New POST route for receiving route_id and label
app.post("/sendRouteLabel", (req, res) => {
  const { route_id, label } = req.body;

  if (route_id && label) {
    console.log(`Received route ID: ${route_id}, Label: ${label}`);
    
    // Add any additional logic or database processing if needed
    res.send({ message: `Route label for ${route_id} received: ${label}` });
  } else {
    res.status(400).send({ error: "Invalid data received" });
  }
});

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

// deleteRow("./databases/main.db", "users", { uid: 1 });
// console.log(getTable("./databases/main.db", "users"));

app.post("/signin/", (req, res) => {});

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
