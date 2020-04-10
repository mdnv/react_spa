import React, { Component } from 'react'
// import {Redirect} from 'react-router-dom'
import axios from "axios"
import {
  NavLink,
} from "react-router-dom"
import flashMessage from '../shared/flashMessages'
import { connect } from 'react-redux'
import { fetchUsers } from '../redux'

class New extends Component {
    constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      remember_me: "1",
      flash: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event, props) {
    const { email, password, remember_me } = this.state;

    axios
      .post(
        "http://localhost:3000/login",
        {
          session: {
            email: email,
            password: password,
            remember_me: remember_me
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.user) {
          fetchUsers();
          this.props.history.push("/");
        }
        if (response.data.flash) {
          flashMessage(...response.data.flash)
        }
      })
      .catch(error => {
        console.log(error)
      });
    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
      {/* <div className={"alert alert-" + this.state.flash[0]}>{this.state.flash[1]}</div> */}
      <h1>Log in</h1>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <form
          action="/login"
          acceptCharset="UTF-8"
          method="post"
          onSubmit={this.handleSubmit}
          >

            <label htmlFor="session_email">Email</label>
            <input
            className="form-control"
            type="email"
            name="email"
            id="session_email"
            value={this.state.email}
            onChange={this.handleChange}
            />

            <label htmlFor="session_password">Password</label>
            <a href="/password_resets/new">(forgot password)</a>
            <input
            className="form-control"
            type="password"
            name="password"
            id="session_password"
            value={this.state.password}
            onChange={this.handleChange}
            />

            <label className="checkbox inline" htmlFor="session_remember_me">
              <input
              name="remember_me"
              type="hidden"
              value="0" />
              <input
              type="checkbox"
              checked="checked"
              name="remember_me"
              id="session_remember_me"
              value={this.state.remember_me}
              onChange={this.handleChange}
              />
              <span>Remember me on this computer</span>
            </label>
            <input type="submit" name="commit" value="Log in" className="btn btn-primary" data-disable-with="Log in" />
      </form>
          <p>New user? <NavLink to="/signup">Sign up now!</NavLink></p>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New)
