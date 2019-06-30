import React, { Component } from "react";
import PropTypes from "prop-types";

class MovieDetailsPage extends Component {
  static props = {
    match: PropTypes.object.isRequired
  };

  state = {
    movieDetails: undefined,
    fetchStatus: false
  };

  static _log(...message) {
    console.log("|MovieDetailsPage|", ...message);
  }

  componentDidMount() {
    const { movieId } = this.props.match.params;
    console.log(movieId);
    //console.log(`inside movieDetailsPage with movieId : ${movieId}`);
    fetch("https://cine-world.herokuapp.com/api/Movie/" + movieId + "/Details")
      .then(results => {
        return results.json();
      })
      .then(response => {
        this.setState({ movieDetails: response, fetchStatus: true });
        MovieDetailsPage._log(`returned movieDetails list is ${response}`);
      })
      .catch(function(err) {
        MovieDetailsPage._log("Fetch Error :-S", err);
      });
  }

  render() {
    const item = this.state.movieDetails;
    if (!this.state.fetchStatus) {
      return <div>Rendering movie details...</div>;
    }

    if (!item.id) {
      return (
        <div>
          Sorry we couldn't find details for this movie. Please refresh the
          page.
        </div>
      );
    }
    return (
      <div>
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
    );
  }
}

export default MovieDetailsPage;
