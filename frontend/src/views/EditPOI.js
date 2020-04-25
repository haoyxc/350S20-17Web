import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BASEURL, BUILDINGS } from "../constants";
import { Redirect } from "react-router";
import axios from "axios";
import AddImageButton from "../components/AddImageButton";
import Spinner from "../components/Spinner";
import RemovableImage from "../components/RemovableImage";

export default class EditPOI extends Component {

  constructor(props) {
    super(props);
    const poi = this.props.location.poi
    this.state = {
      id: poi._id,
      name: poi.name,
      description: poi.description,
      category: poi.category,
      address: poi.address,
      latitude: poi.latitude,
      longitude: poi.longitude,
      image: poi.image,
      uploading: false,
      redirectToMain: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // gets called when a file is selected
  onFileUploaded = e => {
    // handle image uploaded
    const files = Array.from(e.target.files)
    this.setState({ uploading: true })

    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = () => {
      var encodedImage = reader.result
      console.log(encodedImage)
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

  }

  removeImage = () => {
    this.setState({
      image: null
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
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
      .post(`${BASEURL}/editPOI`, {
        id: this.state.id,
        name: this.state.name,
        description: this.state.description,
        category: this.state.category,
        address: this.state.address,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        image: this.state.image
      })
      .then((resp) => {
        console.log(resp);
        if (resp.data.error) {
          return;
        } else {
          //no error
          console.log(resp.data);
          this.setState({ redirectToMain: true });
        }
      });
  }
  render() {
    const { name, description, category, address, latitude, longitude, uploading, image, redirectToMain } = this.state

    if (redirectToMain) {
        return <Redirect to="/" />;
    }

    const imageContent = () => {
      switch(true) {
        case uploading:
          return <Spinner />
        case image != null:
          return <RemovableImage image={image} removeImage={this.removeImage} />
        default:
          return <AddImageButton onChange={this.onFileUploaded} />
      }
    }

    return (
      <div style={pageStyle}>
        <h2>Submit a POI</h2>
        <form style={formStyle} onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            className="form-control"
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={this.handleChange}
          />
          <label htmlFor="category">Choose a Category:</label>
          <select
            id="category"
            name="category"
            className="form-control"
            onChange={this.handleChange}
            value={category}
          >
            <option value="Bathroom">Bathroom</option>
            <option value="Water Fountain">Water Fountain</option>
            <option value="Study Space">Study Space</option>
          </select>
          <input
            className="form-control"
            type="text"
            name="address"
            id="address"
            value={address}
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            type="decimal"
            name="latitude"
            id="latitude"
            value={latitude}
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            type="decimal"
            name="longitude"
            id="longitude"
            value={longitude}
            onChange={this.handleChange}
          />
          <div className='image-content'>
            {imageContent()}
          </div>
          <button className="btn btn-secondary btn-sm" type="submit" value="Login">
            Save Changes
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
