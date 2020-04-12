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
  poiToSave
    .save()
    .then(response => {
      res.send({ success: true });
    })
    .catch(err => {
      console.log(err);
      res.send({ sucess: false });
    });
});
// Get all the POIs that are not approved yet
router.get("/getSubmittedPOIs", (req, res) => {});

router.get("/getApprovedPOIs", (req, res) => {
  POI.find({ approved: true })
    .then(resp => {
      console.log("ROUTE 2", resp);
      res.send({ pois: resp });
    })
    .catch(e => {
      console.log(e);
      res.send({ error: true });
    });
});

module.exports = router;
