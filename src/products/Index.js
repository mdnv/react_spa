import React, { Component } from 'react'

import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/articles?q=';
const imgUrl = 'http://localhost:3000/';

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

  render(){
    let autoCompleteList = this.state.autoCompleteResults.map((response) => {
      return <tr key={'article'+response.id}>
        <td>{response.id}</td>
        <td>{response.title}</td>
        <td>{response.text}</td>
        <td></td>
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
              <th scope="col">Action</th>
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
