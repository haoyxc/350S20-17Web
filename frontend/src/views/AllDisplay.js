import React, { Component } from "react";
import POIDisplay from "../components/POIDisplay";
import AddButton from "../components/AddButton";
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
          details: { stalls: 2, description: "bad" },
        },
        {
          name: "Mezz Fountain",
          category: "Water Fountain",
          longitude: 31,
          latitude: 54.2,
          address: "3010 car ave",
          details: { status: "always GREEN" },
        },
      ],
      redirectToAdd: false,
      otherPanel: null,
    };
    this.handleShowAdd = this.handleShowAdd.bind(this);
  }
  componentDidMount() {
    //get the POIs here
  }
  handleShowAdd() {
    this.setState({ otherPanel: "add" });
  }
  render() {
    let { pois, otherPanel, redirectToAdd } = this.state;

    return (
      <div style={outerContainer}>
        <div style={innerContainer}>
          <div>
            {pois.map((p) => (
              <POIDisplay poi={p} />
            ))}
            <AddButton onClick={this.handleShowAdd} />
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
  margin: "20px",
};
const outerContainer = {
  margin: "0 50px",
  textAlign: "center",
};
