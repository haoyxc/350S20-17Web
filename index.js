const express = require("express");

// DON'T FORGET TO 'source env.sh'
let models = require("./utility/models");
let routes = require("./utility/routes");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
var proxy = require("http-proxy-middleware");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true, // enable set cookie
  })
);
// app.use("/api", proxy({ target: "http://10.103.76.104:3000", changeOrigin: true }));
app.use(routes);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const port = 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
module.exports = app;
