import React, { useEffect } from 'react'
import axios from "axios"
import {
  NavLink
} from "react-router-dom"
import { connect } from 'react-redux'
import { fetchUsers } from '../redux'

const Header = ({ userData, fetchUsers }) => {
  useEffect(() => {
    fetchUsers()
  }, [])

  const onClick = () => {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then(response => {
        fetchUsers();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  return (
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
              userData.loading ? (
                <li><a href="/">Loading</a></li>
              ) : userData.error ? (
                <li><a href="/">{userData.error}</a></li>
              ) : userData.users ? (
                <React.Fragment>
                <li><NavLink to="/users">Users</NavLink></li>
                <li className="dropdown">
                  <a href="/" className="dropdown-toggle" data-toggle="dropdown">
                    Account <b className="caret"></b>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a href="/users/127">Profile</a></li>
                    <li><a href="/users/127/edit">Settings</a></li>
                    <li className="divider"></li>
                    <li>
                      <button onClick={onClick}>Logout</button>
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
  )
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
)(Header)
