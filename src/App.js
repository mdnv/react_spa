import React from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./static_pages/Home";
import About from "./static_pages/About";
import Contact from "./static_pages/Contact";
import Help from "./static_pages/Help";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <HashRouter>
    <div className="App">
      <header class="navbar navbar-fixed-top navbar-inverse">
        <div class="container">
        <NavLink exact id="logo" to="/">sample app</NavLink>
          <nav>
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed"
                      data-toggle="collapse"
                      data-target="#bs-example-navbar-collapse-1"
                      aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <ul class="nav navbar-nav navbar-right collapse navbar-collapse"
                id="bs-example-navbar-collapse-1">
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/help">Help</NavLink></li>
                <li><a href="/login">Log in</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div class="container">
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/help" component={Help}/>

        <footer class="footer">
          <small>
            The <a href="https://www.railstutorial.org/">React Tutorial</a> by <a href="https://mdnv.github.io/">mdnv</a>
          </small>
          <nav>
            <ul>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
              <li><a href="https://news.railstutorial.org/">News</a></li>
            </ul>
          </nav>
        </footer>
      </div>
    </div>
    </HashRouter>
  );
}

export default App;
