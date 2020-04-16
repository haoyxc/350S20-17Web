import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BASEURL, BUILDINGS } from "../constants";
import { Redirect } from "react-router";
import axios from "axios";
import AddImageButton from "../components/AddImageButton";
import Image from "../components/Image";
import Spinner from "../components/Spinner";

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
      image: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // gets called when a file is selected
  onFileUploaded = e => {
    console.log('on change')
    // handle image uploaded
    const files = Array.from(e.target.files)
    this.setState({ uploading: true })

    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = () => {
      var encodedImage = reader.result
      this.setState({ image: encodedImage });
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
        category: this.state.category,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      })
      .then((resp) => {
        console.log(resp);
        if (resp.data.error) {
          return;
        } else {
          //no error
          console.log(resp.data);
        }
      });
  }
  render() {
    const { uploading, image } = this.state

    const imageContent = () => {
      switch(true) {
        case uploading:
          return <Spinner />
        case image != null:
          return <Image image={image} removeImage={this.removeImage} />
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
          </select>
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
          <div className='image-content'>
            {imageContent()}
          </div>
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
