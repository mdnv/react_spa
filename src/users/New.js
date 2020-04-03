import React, { Component } from 'react'
// import {Redirect} from 'react-router-dom';
import axios from "axios";
import Pluralize from 'react-pluralize'

class New extends Component {
    constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      errorMessage: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { name, email, password, password_confirmation } = this.state;

    axios
      .post(
        "http://localhost:3000/en/api/v1/users",
        {
          user: {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.user) {
          // this.props.handleSuccessfulAuth(response.data);
          this.setState({errorMessage: ""});
          this.props.history.push("/");
          console.log(response);
        }
        if (response.data.error) {
          // this.props.handleSuccessfulAuth(response.data);
          this.setState({errorMessage: response.data.error});
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
      <h1>Sign up</h1>

      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <form
          className="new_user"
          id="new_user" action="/users"
          acceptCharset="UTF-8"
          method="post"
          onSubmit={this.handleSubmit}
          >
            { this.state.errorMessage &&
              <div id="error_explanation">
                <div className="alert alert-danger">
                  The form contains <Pluralize singular={'error'} count={ this.state.errorMessage.length } />.
                </div>
                <ul>
                  { this.state.errorMessage.map((error, i) => {
                     return (<li key={i}>{error}</li>)
                  })}
                </ul>
              </div>
            }

            <label htmlFor="user_name">Name</label>
            <input
            className="form-control"
            type="text"
            name="name"
            id="user_name"
            autoComplete="off"
            value={this.state.name}
            onChange={this.handleChange}
            />

            <label htmlFor="user_email">Email</label>
            <input
            className="form-control"
            type="email"
            name="email"
            id="user_email"
            value={this.state.email}
            onChange={this.handleChange}
            />

            <label htmlFor="user_password">Password</label>
            <input
            className="form-control"
            type="password"
            name="password"
            id="user_password"
            value={this.state.password}
            onChange={this.handleChange}
            />

            <label htmlFor="user_password_confirmation">Confirmation</label>
            <input
            className="form-control"
            type="password"
            name="password_confirmation"
            id="user_password_confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            />

            <input type="submit" name="commit" value="Create my account" className="btn btn-primary" data-disable-with="Create my account" />
      </form>  </div>
      </div>
      </React.Fragment>
    );
  }
}

export default New;
