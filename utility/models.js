let mongoose = require("mongoose");
let connect = process.env.MONGODB_URI;

mongoose.connect(connect, { useNewUrlParser: true });

const poiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
  },
});
let POI = mongoose.model("POI", poiSchema);
module.exports = {
  POI: POI,
};
