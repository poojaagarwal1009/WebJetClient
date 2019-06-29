import React, { Component } from "react";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      movieDetails: {},
      showMovieDetails: false
    };
  }

  componentDidMount() {
    fetch("https://cine-world.herokuapp.com/api/Movie/List")
      .then(results => {
        return results.json();
      })
      .then(response => {
        this.setState({ movieList: response.movies });
        console.log(this.state.movieList);
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  }

  getMovieDetails(movieId) {
    console.log("this is me " + movieId);
    fetch(
      "https://cine-world.herokuapp.com/api/Movie/" +
        movieId.substring(2) +
        "/Details"
    )
      .then(results => {
        return results.json();
      })
      .then(response => {
        this.setState({ movieDetails: response, showMovieDetails: true });
        console.log(this.state.movieDetails);
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  }

  removeDuplicateMovies(movieList) {
    movieList = movieList.filter(
      (movie, index, self) =>
        index === self.findIndex(t => t.title === movie.title)
    );
    return movieList;
  }

  render() {
    const movieList = this.removeDuplicateMovies(this.state.movieList);
    const { showMovieDetails, movieDetails } = this.state;
    if (showMovieDetails) {
      return movieDetails.map((item, key) => (
        <div key={key}>
          <h1>{item.title}</h1>
          <p>{item.year}</p>
          <p>{item.rated}</p>
          <p>{item.released}</p>
          <p>{item.runtime}</p>
          <p>{item.genre}</p>
          <p>{item.director}</p>
          <p>{item.writer}</p>
          <p>{item.actors}</p>
          <p>{item.plot}</p>
          <p>{item.language}</p>
          <p>{item.country}</p>
          <p>{item.poster}</p>
          <p>{item.metascore}</p>
          <p>{item.rating}</p>
          <p>{item.votes}</p>
          <p>{item.id}</p>
          <p>{item.type}</p>
          <p>{item.price}</p>
          {/* <p>{...item}</p> */}
        </div>
      ));
    }
    return (
      <div className="App">
        {movieList.map((item, key) => (
          <div key={key}>
            {/* <img src={item.poster} alt="Smiley face" height="42" width="42" /> */}
            <button onClick={() => this.getMovieDetails(item.id)}>
              {item.title}
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
