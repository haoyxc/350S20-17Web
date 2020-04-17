const express = require("express");
const router = express.Router();
const models = require("./models");
const bodyParser = require("body-parser");
const POI = models.POI;

router.use(bodyParser.urlencoded());

router.use(bodyParser.json());

// add a new POI as the admin
router.post("/addPOI", (req, res) => {
  let poiObj = req.body;
  poiObj.approved = true;
  const poiToSave = new POI(poiObj);
  poiToSave
    .save()
    .then((response) => {
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.send({ sucess: false });
    });
});

// Get all the POIs that are not approved yet
router.get("/getSubmittedPOIs", (req, res) => {
  POI.find({ approved: false })
    .then((resp) => {
      res.send({ pois: resp });
    })
    .catch((e) => {
      console.log(e);
      res.send({ error: true });
    });
});

router.get("/getApprovedPOIs", (req, res) => {
  POI.find({ approved: true })
    .then((resp) => {
      res.send({ pois: resp });
    })
    .catch((e) => {
      console.log(e);
      res.send({ error: true });
    });
});

router.post("/denyPOI", (req, res) => {
  console.log("IN DENY POI");
  console.log(req.body.poi);
});

router.post("/acceptPOI", (req, res) => {
  console.log("IN ACCEPT POI");
  console.log(req.body.poi);
});

// delete POI as the admin
router.post("/deletePOI", (req, res) => {
  let poiObj = req.body;
  const name = poiObj.name;

  POI.findOneAndDelete({ "name" : name})
    .then((response) => {
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.send({ sucess: false })
    });
});

// edit POI as the admin
router.post("/editPOI", (req, res) => {

    let poiObj = req.body;
    const name = poiObj.name;
    
    POI.findOneAndUpdate({ "name" : name}, {$set: req.body})
    .then((response) => {
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.send({ sucess: false })
    });

});

module.exports = router;
