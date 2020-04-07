import React, { Component } from "react";

export default class Welcome extends Component {
  render() {
    return (
      <div style={welcome}>
        <h4>Welcome, Trusted Administrator</h4>
      </div>
    );
  }
}
const welcome = {
  textAlign: "center",
  backgroundColor: "#bae1ff",
  padding: "20px",
};
