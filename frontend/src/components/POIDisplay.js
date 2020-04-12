import React, { Component } from "react";

export default class POIDisplay extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { poi } = this.props;
    let details = poi.details;
    let keys = poi.details ? Object.keys(poi.details) : null;

    return (
      <div style={individualPoi}>
        <h3>{poi.name}</h3>
        <p style={poiDetail}>{poi.category}</p>
        <p style={poiDetail}>{poi.address}</p>
        <p style={poiDetail}>
          ({poi.longitude}, {poi.latitude})
        </p>
        {keys
          ? keys.map(k => {
              return (
                <p style={poiDetail}>
                  {k.charAt(0).toUpperCase() + k.slice(1)}: {details[k]}
                </p>
              );
            })
          : null}
        {/* {keys.map(k => {
          return (
            <p style={poiDetail}>
              {k.charAt(0).toUpperCase() + k.slice(1)}: {details[k]}
            </p>
          );
        })} */}
        <div className={poiBtns}>
          <button className="btn btn-danger btn-sm" type="submit" value="Delete">
            Delete POI
          </button>
          <button className="btn btn-secondary btn-sm" type="submit" value="Edit">
            Edit POI
          </button>
        </div>
      </div>
    );
  }
}
const individualPoi = {
  margin: "10px",
  backgroundColor: "#b5c6cf",
  padding: "15px"
};
const poiBtns = {
  display: "flex",
  flexDirection: "row",
  padding: "0px 10px"
};
const poiDetail = {
  padding: "0px",
  margin: "0px"
};
