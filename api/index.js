// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
const path = require('path');
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(__dirname, "..","public")));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  const date = req.params.date;

  if (!date) {
    res.json({
      unix: Date.parse(new Date()),
      utc: new Date().toUTCString(),
    });
  } else if (isNaN(date)) {
    //No es un número.
    const entryDate = new Date(date).toUTCString();
    const unixNumber = Date.parse(entryDate);
    if (isNaN(unixNumber)) {
      res.json({
        error: "Invalid Date",
      });
    } else {
      res.json({
        unix: unixNumber,
        utc: entryDate,
      });
    }
  } else {
    const entryDate = new Date(parseInt(date)).toUTCString();
    const unixNumber = Date.parse(entryDate);

    if (!isNaN(unixNumber)) {
      //Es un número.
      res.json({
        unix: unixNumber,
        utc: entryDate,
      });
    } else {
      res.json({
        error: "Invalid Date",
      });
    }
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

module.exports = app;
