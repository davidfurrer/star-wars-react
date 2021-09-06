import React, { Component } from "react";
import "./styles.scss";

class Movie extends Component {
  // state = { color: "blue" };

  setMovieSelected = (event) => {
    event.preventDefault();
    this.props.handleMovieClick(this.props.movie);
    // this.setState({ color: "red" });
  };

  render() {
    return (
      <div
        onClick={this.setMovieSelected}
        className="movieDiv"
        // style={{ backgroundColor: this.state.color }}
      >
        {this.props.movie.title}
      </div>
    );
  }
}

export default Movie;
