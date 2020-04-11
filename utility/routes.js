const express = require("express");
const router = express.Router();
const models = require("./models");
const bodyParser = require("body-parser");
const POI = models.POI;

router.use(bodyParser.urlencoded());

router.use(bodyParser.json());

router.post("/addPOI", (req, res) => {
  let poiObj = req.body;
  poiObj.approved = true;
  const poiToSave = new POI(poiObj);

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
// Get all the POIs that are not approved yet
router.get("/getSubmittedPOIs", (req, res) => {});

module.exports = router;
