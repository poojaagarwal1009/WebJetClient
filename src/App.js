import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import MovieListPage from "./pages/movieList.page";
import MovieDetailsPage from "./pages/movieDetails.page";

import "./App.css";

class App extends Component {
  render() {
    console.log(this.props.routes);
    return (
      <Router>
        <div>
          <h2>Welcome to React Movie search</h2>
          {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li>
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to={"/details"} className="nav-link">
                  About
                </Link>
              </li>
            </ul>
          </nav> */}
          {/* <hr /> */}
          <Switch>
            <Route exact path="/" component={MovieListPage} />
            <Route path="/details/:movieId" component={MovieDetailsPage} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
