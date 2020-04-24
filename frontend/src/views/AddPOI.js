import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BASEURL, CATEGORIES } from "../constants";
import { Redirect } from "react-router";
import axios from "axios";
import AddImageButton from "../components/AddImageButton";
import RemovableImage from "../components/RemovableImage";
import Spinner from "../components/Spinner";
import styled from "styled-components";

const HoverText = styled.p`
  color: #000;
  :hover {
    color: #839289;
    cursor: pointer;
    font-weight: bold;
  }
`;
export default class AddPOI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
      category: "Bathroom",
      address: null,
      latitude: null,
      longitude: null,
      image: null,
      uploading: false,
      details: null,
      //Redirect things
      redirectToMain: false,
      redirectToCategory: false,
      categoryFields: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDetail = this.handleChangeDetail.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    let { category } = this.props;
    let catFields = CATEGORIES[category];
    this.setState({ categoryFields: catFields });
    console.log(catFields);
  }

  // gets called when a file is selected
  onFileUploaded = (e) => {
    // handle image uploaded
    const files = Array.from(e.target.files);
    this.setState({ uploading: true });

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      var encodedImage = reader.result
      if (encodedImage.length > 92404) {
        alert("Image too large, try again with a smaller image.");
      } else {
        this.setState({ image: encodedImage });
      }
      this.setState({ uploading: false })
    }
    reader.onerror = error => {
      console.log(error)
      this.setState({ uploading: false })
      alert("Error uploading image");
    }
  };

  removeImage = () => {
    this.setState({
      image: null,
    });
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChangeDetail(e) {
    let { details } = this.state;
    let copyDetails = Object.assign({}, details);
    copyDetails[e.target.name] = e.target.value;
    this.setState({ details: copyDetails });
  }
  handleBack(e) {
    this.setState({ redirectToMain: true });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (
      !this.state.name ||
      !this.state.description ||
      !this.state.category ||
      !this.state.latitude ||
      !this.state.longitude
    ) {
      alert("Fill out all fields please!");
      return;
    }
    axios
      .post(`${BASEURL}/addPOI`, {
        name: this.state.name,
        description: this.state.description,
        category: this.props.category,
        address: this.state.address,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        details: this.state.details,
        image: this.state.image,
      })
      .then((resp) => {
        console.log(resp);
        this.setState({ redirectToMain: true });
        if (resp.data.error) {
          return;
        } else {
          console.log(resp.data);
          this.setState({ redirectToMain: true });
        }
      });
  }
  render() {
    const {
      uploading,
      image,
      redirectToMain,
      redirectToCategory,
      categoryFields,
    } = this.state;

    if (redirectToMain) {
      return <Redirect to="/" />;
    }
    // else if (redirectToCategory) {
    //   return <Redirect to="/" />;
    // }

    const imageContent = () => {
      switch (true) {
        case uploading:
          return <Spinner />;
        case image != null:
          return <RemovableImage image={image} removeImage={this.removeImage} />;
        default:
          return <AddImageButton onChange={this.onFileUploaded} />;
      }
    };

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
          {categoryFields
            ? categoryFields.map((f) => {
                return (
                  <input
                    className="form-control"
                    type="text"
                    name={f}
                    id={f}
                    placeholder={f}
                    onChange={this.handleChangeDetail}
                  />
                );
              })
            : null}
          <input
            className="form-control"
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            type="decimal"
            name="latitude"
            id="latitude"
            placeholder="Latitude"
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            type="decimal"
            name="longitude"
            id="longitude"
            placeholder="Longitude"
            onChange={this.handleChange}
          />

          <div className="image-content">{imageContent()}</div>
          <button className="btn btn-secondary btn-sm" type="submit" value="Submit">
            Submit
          </button>
        </form>
        <HoverText onClick={this.handleBack}>Go Back</HoverText>
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
