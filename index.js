// index.js
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

app.get('/api/:date?', (req, res) => {
  let inputDate = req.params.date;
  if (!inputDate) {
    inputDate = new Date().getTime();
  } else {
    const timestamp = Number(inputDate);
    if (!isNaN(timestamp)) {
      const dateObject = new Date(timestamp);
      const utcDate = dateObject.toUTCString();
      res.json({ unix: timestamp, utc: utcDate });
      return; // Return here to prevent further execution
    }
  }

  const dateObject = new Date(inputDate);
  if (!isNaN(dateObject)) {
    const utcDate = dateObject.toUTCString();
    const unixTimestamp = dateObject.getTime();
    res.json({ unix: unixTimestamp, utc: utcDate });
  } else {
    res.status(400).json({ error: 'Invalid Date' });
  }
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

