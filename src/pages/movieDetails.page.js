import React, { Component } from "react";
import PropTypes from "prop-types";

class MovieDetailsPage extends Component {
  static props = {
    match: PropTypes.object.isRequired
  };

  state = {
    movieDetails: undefined
  };

  static _log(...message) {
    console.log("|MovieDetailsPage|", ...message);
  }

  componentDidMount() {
    const { movieId } = this.props.match.params;
    //console.log(`inside movieDetailsPage with movieId : ${movieId}`);
    fetch(
      "https://cine-world.herokuapp.com/api/Movie/" +
        movieId.substring(2) +
        "/Details"
    )
      .then(results => {
        return results.json();
      })
      .then(response => {
        this.setState({ movieDetails: response });
        MovieDetailsPage._log(`returned movieDetails list is ${response}`);
      })
      .catch(function(err) {
        MovieDetailsPage._log("Fetch Error :-S", err);
      });
  }

  render() {
    const { movieDetails } = this.state;
    if (!movieDetails) {
      return <div>Rendering movie details...</div>;
    }
    return movieDetails.map((item, key) => (
      <div key={key}>
        <h3>{item.title}</h3>
        <p>{item.year}</p>
        <p>{item.rated}</p>
        <p>{item.runtime}</p>
        <p>{item.director}</p>
        <p>{item.writer}</p>
        <p>{item.language}</p>
        <p>{item.country}</p>
        <p>{item.metascore}</p>
        <p>{item.rating}</p>
        <p>{item.votes}</p>
        <p>{item.id}</p>
        <p>{item.type}</p>
        <p>{item.price}</p>
        <p>{item.released}</p>
        <p>{item.genre}</p>
        <p>{item.actors}</p>
        <p>{item.poster}</p>
        <p>{item.plot}</p>
      </div>
    ));
  }
}

export default MovieDetailsPage;
