import React, { Component } from "react";
import logo from '../logo.svg';
import {
  NavLink,
} from "react-router-dom";

class Home extends Component {
  render() {
    return (
        <React.Fragment>
        <div className="center jumbotron">
            <h1>Welcome to the Sample App</h1>
            <h2>
            This is the home page for the <a href="https://www.railstutorial.org/">React Tutorial</a> sample application.
            </h2>
            <NavLink to="/signup" className="btn btn-lg btn-primary">Sign up now!</NavLink>
        </div>
        <a href="https://rubyonrails.org/"><img alt="Rails logo" width="70" src={logo} /></a>
        </React.Fragment>
    );
  }
}

export default Home;
