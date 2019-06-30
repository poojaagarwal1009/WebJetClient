import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class MovieListPage extends Component {
  state = {
    movieList: [],
    showMovieDetails: false
  };

  static _log(...message) {
    console.log("|MovieListPage|", ...message);
  }

  componentDidMount() {
    fetch("https://cine-world.herokuapp.com/api/Movie/List")
      .then(results => {
        return results.json();
      })
      .then(response => {
        this.setState({ movieList: response.movies });
        MovieListPage._log(this.state.movieList);
      })
      .catch(function(err) {
        MovieListPage._log("Fetch Error :-S", err);
      });
  }

  getMovieDetails = movieId => {
    this.setState({ showMovieDetails: true, movieId: movieId });
  };

  renderMovieDetails() {
    const { movieId } = this.state;
    const url = `/details/${movieId}`;
    return <Redirect push to={url} />;
  }

  removeDuplicateMovies(movieList) {
    movieList = movieList.filter(
      (movie, index, self) =>
        index === self.findIndex(t => t.title === movie.title)
    );
    return movieList;
  }

  render() {
    const { movieList, showMovieDetails } = this.state;
    if (showMovieDetails) {
      return this.renderMovieDetails();
    }
    if (!showMovieDetails && movieList.length < 1) {
      return <div>Rendering Movie List...</div>;
    }

    return (
      <div className="App">
        {movieList.map((item, key) => (
          <div key={key}>
            <div>Name-> {item.title}</div>
            <div>Released in-> {item.year}</div>
            {/* <div>Genre-> {item.type}</div> */}
            <button onClick={() => this.getMovieDetails(item.id)}>
              Details
            </button>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

export default MovieListPage;
