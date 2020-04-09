const express = require("express");
const router = express.Router();
const models = require("./models");
const bodyParser = require("body-parser");
const POI = models.POI;

router.use(bodyParser.urlencoded());

router.use(bodyParser.json());

router.post("/addPOI", (req, res) => {
  const poiToSave = new POI(req.body);
  poiToSave.save((err, resp) => {
    if (err) {
      console.log(err);
      res.send({ sucess: false });
    }
    console.log(resp);
    console.log("YAY");
    res.send({ success: true });
  });
});

module.exports = router;
