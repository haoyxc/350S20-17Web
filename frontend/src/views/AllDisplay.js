import React, { Component } from "react";
import { Redirect } from "react-router";
import POIDisplay from "../components/POIDisplay";
import axios from "axios";
import AddPOI from "./AddPOI";
import { BASEURL } from "../constants";
import UserPOISubmissions from "./UserPOISubmissions";
import styled from "styled-components";

const HoverText = styled.p`
  color: #000;
  :hover {
    color: #839289;
    cursor: pointer;
    font-weight: bold;
  }
`;

export default class AllDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pois: null,
      //   [
      //   {
      //     name: "Best Bathroom",
      //     category: "Bathroom",
      //     longitude: 122,
      //     latitude: 455,
      //     address: "2019 michael rd",
      //     details: { stalls: 2, description: "bad" }
      //   },
      //   {
      //     name: "Mezz Fountain",
      //     category: "Water Fountain",
      //     longitude: 31,
      //     latitude: 54.2,
      //     address: "3010 car ave",
      //     details: { status: "always GREEN" }
      //   }
      // ],
      redirectToAdd: false,
      goToApprove: false,
      otherPanel: null
    };
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleApprovePOIs = this.handleApprovePOIs.bind(this);
  }
  componentDidMount() {
    //get the POIs here
    console.log("daa");
    axios.get(`${BASEURL}/getApprovedPOIs`).then(resp => {
      console.log(resp.data);
      if (resp.data.pois) {
        this.setState({ pois: resp.data.pois });
      }
    });
  }
  handleAddClick(e) {
    e.preventDefault();
    this.setState({ redirectToAdd: true });
  }
  handleApprovePOIs(e) {
    e.preventDefault();
    this.setState({ goToApprove: true });
  }
  render() {
    let { pois, otherPanel, redirectToAdd, goToApprove } = this.state;
    if (redirectToAdd) {
      return <Redirect to="/add" />;
    } else if (goToApprove) {
      return <Redirect to="/approveReqs" />;
    }

    return (
      <div style={outerContainer}>
        <div style={innerContainer}>
          <div>
            {pois ? pois.map(p => <POIDisplay poi={p} />) : "loading"}

            <button
              className="btn btn-secondary btn-sm"
              type="submit"
              value="Add"
              onClick={this.handleAddClick}
            >
              Add
            </button>
            <HoverText onClick={this.handleApprovePOIs}>
              Or, see POIs you can approve
            </HoverText>
          </div>
        </div>
      </div>
    );
  }
}
const innerContainer = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  margin: "20px"
};
const outerContainer = {
  margin: "0 50px",
  textAlign: "center"
};
