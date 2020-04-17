import React, { Component } from "react";
import axios from "axios";
import { BASEURL } from "../constants";
import { Redirect } from "react-router";

export default class UserPOI extends Component {
  constructor(props) {
    super(props);
    this.handleDenyClick = this.handleDenyClick.bind(this);
    this.handleAcceptClick = this.handleAcceptClick.bind(this);
  }
  handleDenyClick(e) {
    let { poi } = this.props;
    e.preventDefault();
    axios
      .post(`${BASEURL}/denyPOI`, {
        poi,
      })
      .then((resp) => {
        console.log(resp);
        if (resp.data.error) {
          return;
        } else {
          //no error
          console.log(resp.data);
        }
      });
  }
  handleAcceptClick(e) {
    e.preventDefault();
    let { poi } = this.props;
    axios
      .post(`${BASEURL}/acceptPOI`, {
        poi,
      })
      .then((resp) => {
        console.log(resp);
        if (resp.data.error) {
          return;
        } else {
          //no error
          console.log(resp.data);
        }
      });
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
          ? keys.map((k) => {
              return (
                <p style={poiDetail}>
                  {k.charAt(0).toUpperCase() + k.slice(1)}: {details[k]}
                </p>
              );
            })
          : null}
        <div className={poiBtns}>
          <button
            className="btn btn-danger btn-sm"
            type="submit"
            value="Deny"
            onClick={this.handleDenyClick}
          >
            Deny
          </button>
          <button
            className="btn btn-success btn-sm"
            type="submit"
            value="Approve"
            onClick={this.handleAcceptClick}
          >
            Approve
          </button>
        </div>
      </div>
    );
  }
}
const individualPoi = {
  margin: "10px",
  backgroundColor: "#b5c6cf",
  padding: "15px",
};
const poiBtns = {
  display: "flex",
  flexDirection: "row",
  padding: "0px 10px",
};
const poiDetail = {
  padding: "0px",
  margin: "0px",
};
