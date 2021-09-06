import React, { Component } from "react";
import "./styles.scss";

class Pilot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "loading",
    };
  }

  componentDidMount() {
    this.fetchPilotData(this.props.pilotURL);
  }

  setPilotSelected = (event) => {
    event.preventDefault();
    this.props.handlePilotClick(this.props.pilotURL);
  };

  fetchPilotData = (PilotURL) => {
    fetch(PilotURL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ name: data.name });
        console.log(data);
      });
  };

  addToFavorites = (event) => {
    event.preventDefault();
    this.props.handleAddToFavoritesClick(this.state.name);
  };

  render() {
    return (
      <div className="pilotContainer">
        <div onClick={this.setPilotSelected}>{this.state.name}</div>
        <button onClick={this.addToFavorites}>Add to Favorites</button>
      </div>
    );
  }
}

export default Pilot;
