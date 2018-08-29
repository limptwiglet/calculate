/* eslint-env node */

var express = require("express"),
    app = express(),
    port = parseInt(process.env.PORT, 10) || 4567;

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.use(express.static('./dist/'));

const server = app.listen(port, () => {
  server.emit('ready');
});

exports.default = server;
