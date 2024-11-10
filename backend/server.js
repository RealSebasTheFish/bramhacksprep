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
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json()); // Middleware for JSON parsing

app.get("/transitlabels/", (req, res) => {
  res.send({ labels: Object.keys(transitLabels) });
});

app.get("/transit/", function (req, res) {
  //gets the information from user, then the object associated with the route_id
  var requestData = req.query;
  res.set("Content-Type", "application/json");
  console.log(requestData.route_id);
  var routeObject = transitLabels[requestData.route_id];
  console.log(routeObject);
  res.send(routeObject);
});

app.get("/transitlocations/", function (req, res) {
  var requestData = req.query;
  //gets the shape id, then the longLat
  var shapeids = requestData.shapeids;
  var returnData = [];
  for (var i = 0; i < shapeids.length; i++) {
    returnData.push(transitData[shapeids[i]]);
  }
  res.send({ locations: returnData });
});

app.get("/signin/", (req, res) => {
  var user = req.query;
  console.log(user, " want to sign in;");
  const row = getRow("./databases/main.db", "users", user);
  if (user.username == row.username && user.password == row.password) {
    createSession(row.uid)
      .then((authKey) => {
        console.log(row.username, "'s authKey: ", authKey);
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
  } else {
    createSession(user.uid)
      .then((authKey) => {
        console.log(authKey);
        res.send({ result: "User added!", authKey: authKey });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
});

// this gets called from and Adult account;
// child object -> username, email, password
// data object in the users table will have a "connection" key
// childOf or parentOf -> username
app.get("/linkchild", (req, res) => {
  var child = req.query.child; // format of info: {parent: {authKey: someValue}, child: {username: , email: , password}}
  var row = getRow("./databases/main.db", "users", child);
  if (child.username === row.username && child.password === row.password) {
    var authKey = req.query.parent.authKey;
    var id = authSession(authKey)
      .then((id) => {
        console.log("id: ", id);
        if (!id) {
          console.log(id);
          res.send({ result: "Please Log in!" });
        } else {
          var row = getRow("./databases/main.db", "users", { uid: id });
          console.log(row);
          var data = JSON.parse(row.data);
          data = JSON.stringify({ ...data, childOf: row.username });
          var result = updateRow(
            "./databases/main.db",
            "users",
            { uid: id },
            { data: data }
          );
          res.send({ result: result });
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.send({ result: "child account not found!" });
  }
});

app.get("/addroute/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  var data = req.query;
  authSession(data.key).then((auth) => {
    if (auth == null)
      res.send(`${req.query.callback}(${JSON.stringify({ result: null })})`);
    var route = data.route;
    var currData = getRow("./databases/main.db", "users", { uid: auth });
    // console.log(currData);
    currData = JSON.parse(currData["data"]);
    currData["saved_routes"].push(route);
    var result = updateRow(
      "./databases/main.db",
      "users",
      { uid: auth },
      { data: JSON.stringify(currData) }
    );
    console.log(result);
    res.send(`${req.query.callback}(${JSON.stringify({ result: "Success" })})`);
  });
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
