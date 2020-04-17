import React, { Component } from "react";
import { BASEURL, BUILDINGS } from "../constants";
import { Redirect } from "react-router";
import axios from "axios";

export default class POIDisplay extends Component {

  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  render() {
    let { poi } = this.props;
    let details = poi.details;
    let keys = poi.details ? Object.keys(poi.details) : null;

    return (
      <div style={individualPoi}>
        <h3>{poi.name}</h3>
        <p style={categStyle}>{poi.category}</p>
        <p style={poiDetail}>{poi.address}</p>
        <p style={poiDetail}>
          Location: ({poi.longitude}, {poi.latitude})
        </p>
        {keys
          ? keys.map((k) => {
              return (
                <p style={poiDetail}>
                  {k.charAt(0).toUpperCase() + k.slice(1)}: {details[k]}
                </p>
              );
            })
          : null}
        <div className={poiBtns}>
          <button className="btn btn-danger btn-sm" type="submit" value="Delete"
            onClick={this.onDelete}>
            Delete POI
          </button>
          <button className="btn btn-secondary btn-sm" type="submit" value="Edit">
            Edit POI
          </button>
        </div>
      </div>
    );
  }

  onDelete() {
    let { poi } = this.props;
    console.log("deleting " + poi)
    axios
      .post(`${BASEURL}/deletePOI`, {
        name: poi.name,
        description: poi.description,
        category: poi.category,
        latitude: poi.latitude,
        longitude: poi.longitude,
        image: poi.image
      })
      .then((resp) => {
        console.log(resp);
        if (resp.data.error) {
          return;
        } else {
          console.log(resp.data);
          this.props.handleDeletedPOI(poi)
        }
      });
  }

}

const individualPoi = {
  margin: "30px",
  backgroundColor: "#b5c6cf",
  padding: "15px",
};
const poiBtns = {
  display: "flex",
  flexDirection: "row",
  padding: "0px 30px",
  margin: "20px",
};
const poiDetail = {
  padding: "0px",
  margin: "10px",
};
const categStyle = {
  padding: "0px",
  margin: "10px",
};
