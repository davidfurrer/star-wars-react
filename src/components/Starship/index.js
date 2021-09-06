import React, { Component } from "react";
import "./styles.scss";

class Starship extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "loading",
    };
  }

  componentDidMount() {
    this.fetchStarshipData(this.props.starshipURL);
  }

  setStarshipSelected = (event) => {
    event.preventDefault();
    this.props.handleStarshipClick(this.props.starshipURL);
  };

  fetchStarshipData = (starshipURL) => {
    fetch(starshipURL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ name: data.name });
        console.log(data);
      });
  };

  render() {
    return <div onClick={this.setStarshipSelected} className="starshipItem">{this.state.name}</div>;
  }
}

export default Starship;
