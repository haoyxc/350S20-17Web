import React, { Component } from "react";
import axios from "axios";
import UserPOI from "../components/UserPOI";
import { BASEURL } from "../constants";

export default class UserPOISubmissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pois: null,
    };
  }

  componentDidMount() {
    //get the POIs here
    console.log("daa");
    axios.get(`${BASEURL}/getSubmittedPOIs`).then((resp) => {
      console.log(resp.data);
      if (resp.data.pois) {
        this.setState({ pois: resp.data.pois });
      }
    });
  }
  render() {
    let { pois } = this.state;
    if (!pois) {
      return <p>LOADING</p>;
    }
    return (
      <div style={outerContainer}>
        <h3>Here are the pOIS</h3>
        {pois.map((p) => (
          <UserPOI poi={p} />
        ))}
      </div>
    );
  }
}
const outerContainer = {
  margin: "0 50px",
  textAlign: "center",
};
