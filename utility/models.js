let mongoose = require("mongoose");
let connect = process.env.MONGODB_URI;

console.log(connect)

try {
  mongoose.connect(connect, { useNewUrlParser: true });
} catch (error) {
  console.log(error)
}

const poiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
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
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
  image: {
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
