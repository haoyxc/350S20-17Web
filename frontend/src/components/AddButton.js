import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class AddButton extends Component {
  render() {
    return (
      <div>
        <button className="btn btn-secondary btn-sm" type="submit" value="Login">
          Add
        </button>
      </div>
    );
  }
}
