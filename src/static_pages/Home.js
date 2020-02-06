import React, { Component } from "react";
import logo from '../logo.svg';

class Home extends Component {
  render() {
    return (
        <div>
        <div class="center jumbotron">
            <h1>Welcome to the Sample App</h1>
            <h2>
            This is the home page for the <a href="https://www.railstutorial.org/">React Tutorial</a> sample application.
            </h2>
            <a class="btn btn-lg btn-primary" href="/signup">Sign up now!</a>
        </div>
        <a href="https://rubyonrails.org/"><img alt="Rails logo" width="200" src={logo} /></a>
        </div>
    );
  }
}
 
export default Home;