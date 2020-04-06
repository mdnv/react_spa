import React, { Component } from "react";
import {
  Route,
  NavLink,
  Switch,
  BrowserRouter
} from "react-router-dom";
import axios from "axios";
import Home from "./static_pages/Home";
import About from "./static_pages/About";
import Contact from "./static_pages/Contact";
import Help from "./static_pages/Help";
import './App.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Users from './users/Index';
import UserNew from './users/New';
import UserShow from './users/Show';
import UserEdit from './users/Edit';
import SessionNew from './sessions/New';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      logged_in: false,
      current_user: {}
    };
  }

  checkLoginStatus() {
    axios
      .get("http://localhost:3000/api/v1/logged_in", { withCredentials: true })
      .then(response => {
        console.log(response);
        if (response.data.user) {
          this.setState({
            logged_in: true,
            user: response.data.user
          });
        } else {
          this.setState({
            logged_in: false,
            user: {}
          });
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then(response => {
        this.setState({
          logged_in: false,
          user: {}
        });
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <header className="navbar navbar-fixed-top navbar-inverse">
          <div className="container">
          <NavLink exact id="logo" to="/">sample app</NavLink>
            <nav>
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1"
                        aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <ul className="nav navbar-nav navbar-right collapse navbar-collapse"
                  id="bs-example-navbar-collapse-1">
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/help">Help</NavLink></li>
                {
                  this.state.logged_in ? (
                    <React.Fragment>
                    <li><NavLink to="/users">Users</NavLink></li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        Account <b className="caret"></b>
                      </a>
                      <ul className="dropdown-menu">
                        <li><a href="/users/127">Profile</a></li>
                        <li><a href="/users/127/edit">Settings</a></li>
                        <li className="divider"></li>
                        <li>
                          <button onClick={() => this.handleLogoutClick()}>Logout</button>
                        </li>
                      </ul>
                    </li>
                    </React.Fragment>
                  ) : (
                    <li><NavLink to="/login">Log in</NavLink></li>
                  )
                }
              </ul>
            </nav>
          </div>
        </header>

        <div className="container">
          <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/help" component={Help}/>
          <Route exact path="/users" component={Users}/>
          <Route exact path="/users/new" component={UserNew}/>
          <Route exact path="/users/:id" component={UserShow}/>
          <Route exact path="/users/:id/edit" component={UserEdit}/>
          <Route exact path="/signup" component={UserNew}/>
          <Route exact path="/login" component={SessionNew}/>
          </Switch>

          <footer className="footer">
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
      </BrowserRouter>
    );
  }
}
