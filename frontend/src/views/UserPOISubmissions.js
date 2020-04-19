import React, { Component } from "react";
import axios from "axios";
import UserPOI from "../components/UserPOI";
import { BASEURL } from "../constants";
import styled from "styled-components";
import { Redirect } from "react-router";

const HoverText = styled.p`
  color: #000;
  :hover {
    color: #839289;
    cursor: pointer;
    font-weight: bold;
  }
`;

export default class UserPOISubmissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pois: null,
      goHome: false,
    };
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack(e) {
    this.setState({ goHome: true });
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
    let { pois, goHome } = this.state;
    if (goHome) {
      return <Redirect to="/" />;
    }
    if (!pois) {
      return <p>LOADING</p>;
    }
    return (
      <div style={outerContainer}>
        <h3>Here are the pOIS</h3>
        {pois.map((p) => (
          <UserPOI poi={p} />
        ))}
        <HoverText onClick={this.handleBack}>GO BACK</HoverText>
      </div>
    );
  }
}
const outerContainer = {
  margin: "0 50px",
  textAlign: "center",
};
