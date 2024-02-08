const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const app = express();

const api = require("./server/routes/api");

//parsers

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//serve static files
app.use(express.static(path.join(__dirname, "dist")));

//set our api routes
app.use("/api", api);

//return other routes to angular index file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

//set port
const port = process.env.PORT || 3000;
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`running on localhost : ${port}`));
