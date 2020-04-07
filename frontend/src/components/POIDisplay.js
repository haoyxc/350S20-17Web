import React, { Component } from "react";

export default class POIDisplay extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { poi } = this.props;
    let details = poi.details;
    let keys = Object.keys(poi.details);
    return (
      <div style={individualPoi}>
        <h3>{poi.name}</h3>
        <p>{poi.location}</p>
        {keys.map((k) => {
          return (
            <p>
              {k}: {details[k]}
            </p>
          );
        })}
        <button className="btn btn-danger btn-sm" type="submit" value="Delete">
          Delete POI
        </button>
      </div>
    );
  }
}
const individualPoi = {
  margin: "10px",
  backgroundColor: "#b5c6cf",
  padding: "15px",
};
