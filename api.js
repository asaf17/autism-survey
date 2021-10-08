var Db = require("./dboperations");
var Cfql2Answer = require("./Cfql2Answer");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.use((request, response, next) => {
  console.log("middleware");
  next();
});

router.route("/cfql2").get((request, response) => {
  Db.getCqflq2Answers().then((data) => {
    response.json(data[0]);
  });
});

router.route("/cfql2").post((request, response) => {
  let cfql2Answer = { ...request.body };
  Db.addCfql2Answer(cfql2Answer).then((data) => {
    response.status(201).json(data);
  });
});

var port = process.env.PORT || 8090;
app.listen(port);
console.log("Cfql2 API is runnning at " + port);
