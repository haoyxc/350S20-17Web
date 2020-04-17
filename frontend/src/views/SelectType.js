import React, { Component } from "react";
import { Redirect } from "react-router";
import AddPOI from "./AddPOI";
import styled from "styled-components";

const HoverText = styled.p`
  color: #000;
  :hover {
    color: #839289;
    cursor: pointer;
    font-weight: bold;
  }
`;

export default class SelectType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "Bathroom",
      goToForm: false,
      goToMain: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleBack(e) {
    this.setState({ goToMain: true });
  }
  handleFormSubmit(e) {
    e.preventDefault();
    this.setState({ goToForm: true });
  }
  render() {
    if (this.state.goToForm) {
      return (
        <div>
          <AddPOI category={this.state.category} />
        </div>
      );
    } else if (this.state.goToMain) {
      return <Redirect to="/" />;
    }
    return (
      <div style={outerContainer}>
        <form>
          <label htmlFor="category">Choose a Category:</label>
          <select
            id="category"
            name="category"
            className="form-control"
            onChange={this.handleChange}
            defaultValue="Bathroom"
          >
            <option value="Bathroom">Bathroom</option>
            <option value="Water Fountain">Water Fountain</option>
            <option value="Study Space">Study Space</option>
            <option value="Printer">Printer</option>
            <option value="Outlet">Outlet</option>
            <option value="Food Truck">Food Truck</option>
          </select>
          <HoverText onClick={this.handleFormSubmit}>Submit</HoverText>
          <HoverText onClick={this.handleBack}>Go Back</HoverText>
        </form>
      </div>
    );
  }
}
const outerContainer = {
  margin: "0 50px",
  textAlign: "center",
};
