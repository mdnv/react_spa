import React, { useEffect } from 'react'
import logo from '../logo.svg';
import {
  NavLink,
} from "react-router-dom";
import { connect } from 'react-redux'
import { fetchUsers } from '../redux'

const Home = ({ userData, fetchUsers }) => {
  return userData.loading ? (
    <h2>Loading</h2>
  ) : userData.error ? (
    <h2>{userData.error}</h2>
  ) : userData.users ? (
    <h2>Signed</h2>
  ) : (
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
)(Home)
