import React, { Component } from 'react'

import { Link } from "react-router-dom";

import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/articles?q=';

class Index extends Component {

  constructor(props) {
    super(props);

    this.state = {
      term: '',
      autoCompleteResults: [],
      itemSelected: {},
      showItemSelected: false
    };

    var self = this;
    axios.get(apiUrl + this.state.term)
    .then(function (response) {
      // handle success
      self.setState({ autoCompleteResults: response.data.articles });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

  }

  getAutoCompleteResults(e){
    this.setState({
      term: e.target.value
    }, () => {

      var self = this;
      axios.get(apiUrl + this.state.term)
      .then(function (response) {
        // handle success
        self.setState({ autoCompleteResults: response.data.articles });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

    });
  }

  handleDelete = (postId) => {
    fetch(`http://localhost:3002/api/v1/authors/${postId}`, { method: 'delete' }).
      then((response) => {
        alert('Post deleted successfully')
        this.fetchPostsList();
      });
  }

  render(){
    let autoCompleteList = this.state.autoCompleteResults.map((response) => {
      return <tr key={'article'+response.id}>
        <td>{response.id}</td>
        <td>{response.title}</td>
        <td>{response.text}</td>
        <td><Link to={`/articles/${response.id}`}>Show</Link></td>
        <td><Link to={`/articles/${response.id}/edit`}>Edit</Link></td>
        {/* <td><Link to={`/api/v1/authors/${response.id}`}>Delete</Link></td> */}
        <td>
                    <button onClick={() => this.handleDelete(response.id) }>
                      Delete
                    </button>
                  </td>
      </tr>
    });

    return (
      <div>
        <input ref={ (input) => { this.searchBar = input } } value={ this.state.term } onChange={ this.getAutoCompleteResults.bind(this) } type='search' placeholder='Search Name' className='form-control' />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Text</th>
              <th scope="col" colSpan="3"></th>
            </tr>
          </thead>
          <tbody>
            { autoCompleteList }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Index;
