// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
    let currentTime = new Date.now();
    if(req.params.date instanceof Date && !isNaN(req.params.date)) {
        let date = new Date(req.params.date);
    } else {
        return res.json({
                    "error": "Invalid Date"
                });
    }
    return res.json({
                "unix": date === '' || date === undefined ? currentTime : date,
                "utc": date === '' || date === undefined ? currentTime.toUTCString : date.toUTCString()
    });
});

app.get("/api/:timestamp", (req, res) => {
    let timestamp = req.params.timestamp;
    let date = new Date(timestamp);
    res.json({
                "unix": timestamp,
                "utc": date
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
