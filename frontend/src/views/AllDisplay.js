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
          location: "Huntsman Hall",
          category: "Bathroom",
          details: { stalls: 2, description: "bad" },
        },
        {
          name: "Mezz Fountain",
          location: "Harrison College House",
          category: "Water Fountain",
          details: { status: "always GREEN" },
        },
      ],
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
    let { pois, otherPanel } = this.state;

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
