import React, { Component } from 'react'

import axios from 'axios';

const apiUrl = 'http://localhost:3001/api/v1/products?q=';
const imgUrl = 'http://localhost:3001/';

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
      self.setState({ autoCompleteResults: response.data.products });
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
        self.setState({ autoCompleteResults: response.data.products });
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
      return <tr key={'product'+response.id}>
        <td>{response.id}</td>
        <td><a href={response.url_edit}><img alt={response.name} className="gravatar" src={imgUrl + response.image_url} height="50" width="50" /></a></td>
        <td><span className="user"><a href={response.url_edit}>{response.name}</a></span></td>
        <td><span className="content">
            | <a data-confirm="You sure?" rel="nofollow" data-method="delete" href={response.url} data-remote="true">delete</a>
          </span>
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
              <th scope="col">Image</th>
              <th scope="col">Name</th>
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
