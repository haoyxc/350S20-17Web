import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class AddPOI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    //something with mongo
  }
  render() {
    return (
      <div style={pageStyle}>
        <h2>Submit a POI</h2>
        <form style={formStyle} onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="form-control"
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            onChange={this.handleChange}
          />
          <label for="category">Choose a Category:</label>
          <select id="category" name="category" className="form-control">
            <option value="huntsman">Bathroom</option>
            <option value="harrison">Water Fountain</option>
            <option value="vanpelt">Study Space</option>
          </select>
          <button className="btn btn-secondary btn-sm" type="submit" value="Login">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
const formStyle = {
  display: "flex",
  flexDirection: "column",
};
const pageStyle = {
  margin: "30px",
  padding: "0 50px",
};
