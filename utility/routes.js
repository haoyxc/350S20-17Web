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
  let poiID = req.body.poi._id;
  POI.findOneAndDelete({ _id: poiID })
    .then((resp) => {
      console.log(resp);
      res.send({ success: true });
    })
    .catch((e) => {
      console.log(e);
      res.send({ success: false });
    });
});

router.post("/acceptPOI", (req, res) => {
  console.log("IN ACCEPT POI");
  console.log(req.body.poi);
  let poiID = req.body.poi._id;
  POI.findOneAndUpdate({ _id: poiID }, { approved: true })
    .then((resp) => {
      console.log(resp);
      res.send({ success: true });
    })
    .catch((e) => {
      console.log(e);
      res.send({ success: false });
    });
});

// delete POI as the admin
router.post("/deletePOI", (req, res) => {
  let poiID = req.body.id;

  POI.findOneAndDelete({ _id: poiID })
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

    let poiID = req.body.id;
    
    POI.findOneAndUpdate({ _id: poiID }, {$set: req.body})
    .then((response) => {
      res.send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.send({ sucess: false })
    });

});

module.exports = router;
