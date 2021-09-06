import React, { Component } from "react";
import Movie from "./components/Movie/index";
import Starship from "./components/Starship/index";
import Pilot from "./components/Pilot/index";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [{ title: "loading" }],
      movieDescription: "",
      starshipURLs: [],
      pilotURLs: [],
      movieSelected: "",
      starshipSelected: "",
      starshipInfo: { name: "", model: "" },
      pilotInfo: { gender: "", hair_color: "" },
      favoritePilots: [],
    };

    console.log("hi from constructor");
  }

  componentDidMount() {
    // always put fetch in componentDidMount
    const url = "https://swapi.dev/api/films/";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ movies: data.results });
      });
  }

  handleMovieClick = (movie) => {
    const starshipList = movie["starships"];
    this.setState({ movieSelected: movie.name });
    this.setState({ starshipURLs: starshipList });
    this.setState({ movieDescription: movie.opening_crawl });
    console.log("state after movie click:", this.state);
  };

  handleStarshipClick = (starshipURL) => {
    fetch(starshipURL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ pilotInfo: { gender: "", hair_color: "" } });
        this.setState({ pilotURLs: data.pilots });
        this.setState({
          starshipInfo: { name: data.name, model: data.model },
        });
        console.log("setting pilotURls after starship click", data);
        console.log("state after starship click", this.state);
      });
  };

  handlePilotClick = (pilotURL) => {
    fetch(pilotURL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          pilotInfo: { gender: data.gender, hair_color: data.hair_color },
        });
        console.log(this.state);
        console.log(data);
      });
  };

  handleAddToFavoritesClick = (pilotName) => {
    // check if already in list, if no, add
    let favPilots = [...this.state.favoritePilots];
    if (!favPilots.includes(pilotName)) {
      favPilots.push(pilotName);
      this.setState({ favoritePilots: favPilots });
      console.log(this.state);
    } else {
      alert(`Already added ${pilotName} to Favorite Pilot List!`);
    }
  };

  render() {
    return (
      <div className="App">
        <div className="Header">Star Wars</div>
        <main>
          <div className="moviesContainer">
            <h2>Movies</h2>
            {this.state.movies.map((movie) => {
              return (
                <Movie
                  key={movie.title}
                  movie={movie}
                  handleMovieClick={this.handleMovieClick}
                />
              );
            })}
            {this.state.movieDescription !== "" && (
              <div className="movieDescription">
                <h4>Description</h4>
                {this.state.movieDescription}
              </div>
            )}
          </div>
          <div className="starshipsContainer">
            <h2>Starships</h2>
            {this.state.starshipURLs.map((starshipURL) => {
              return (
                <Starship
                  key={starshipURL}
                  starshipURL={starshipURL}
                  handleStarshipClick={this.handleStarshipClick}
                />
              );
            })}

            {this.state.starshipInfo.name !== "" && (
              <div className="starshipInfo">
                <h3>Starship Info</h3>
                <div>Name: {this.state.starshipInfo.name}</div>
                <div>Model: {this.state.starshipInfo.model}</div>
              </div>
            )}
          </div>
          <div className="pilotsContainer">
            <h2>Pilots</h2>

            {this.state.pilotURLs.map((pilotURL) => {
              return (
                <Pilot
                  key={pilotURL}
                  pilotURL={pilotURL}
                  handlePilotClick={this.handlePilotClick}
                  handleAddToFavoritesClick={this.handleAddToFavoritesClick}
                />
              );
            })}
            {this.state.pilotInfo.gender !== "" && (
              <div className="pilotInfo">
                <h3>Pilot Info</h3>
                <div>Gender: {this.state.pilotInfo.gender}</div>
                <div>Hair Color: {this.state.pilotInfo.hair_color}</div>
              </div>
            )}
            {this.state.favoritePilots.length !== 0 && (
              <div className="favoritePilots">
                <h3>Favorite Pilots</h3>
                {this.state.favoritePilots.map((favoritePilot) => {
                  return <div key={favoritePilot}>{favoritePilot}</div>;
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }
}
export default App;
