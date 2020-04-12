import React, { Component } from "react";
import { Redirect } from "react-router";
import POIDisplay from "../components/POIDisplay";

import AddPOI from "./AddPOI";

export default class AllDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pois: [
        {
          name: "Best Bathroom",
          category: "Bathroom",
          longitude: 122,
          latitude: 455,
          address: "2019 michael rd",
          details: { stalls: 2, description: "bad" }
        },
        {
          name: "Mezz Fountain",
          category: "Water Fountain",
          longitude: 31,
          latitude: 54.2,
          address: "3010 car ave",
          details: { status: "always GREEN" }
        }
      ],
      redirectToAdd: false,
      otherPanel: null
    };
    this.handleAddClick = this.handleAddClick.bind(this);
  }
  componentDidMount() {
    //get the POIs here
  }
  handleAddClick(e) {
    e.preventDefault();
    this.setState({ redirectToAdd: true });
  }
  render() {
    let { pois, otherPanel, redirectToAdd } = this.state;
    if (redirectToAdd) {
      return <Redirect to="/add" />;
    }

    return (
      <div style={outerContainer}>
        <div style={innerContainer}>
          <div>
            {pois.map(p => (
              <POIDisplay poi={p} />
            ))}
            <button
              className="btn btn-secondary btn-sm"
              type="submit"
              value="Add"
              onClick={this.handleAddClick}
            >
              Add
            </button>
          </div>
          <div>{otherPanel === "add" ? <AddPOI /> : null}</div>
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
