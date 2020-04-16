import React, { useState, useEffect }  from 'react'
import axios from 'axios'
import logo from '../logo.svg'
import {
  NavLink,
} from "react-router-dom"
import { connect } from 'react-redux'
import Pagination from 'react-js-pagination'
import { useQueryParam, NumberParam } from 'use-query-params'

const Home = ({ userData }) => {
  const [page, setPage] = useQueryParam('page', NumberParam);
  const [per, setPer] = useQueryParam('per', NumberParam);
  if ((typeof per) == "undefined") { setPer(5) }
  const [feed_items, setFeedItems] = useState([]);
  const [total_count, setTotalCount] = useState(1);
  const [current_page, setCurrentPage] = useState(page);
  if ((typeof page) == "undefined") { setPage(current_page) }

  useEffect(() => {
    axios
      .get(
        'http://localhost:3000/api',
        {params: {page: page, per: per},
        withCredentials: true }
      )
      .then(response => {
        console.log(response)
        if (response.data.feed_items) {
          setFeedItems(response.data.feed_items);
          setTotalCount(response.data.total_count);
        } else {
          setFeedItems([]);
        }
      })
      .catch(error => {
        console.log(error)
      });
  }, [page, per])

  const handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    setCurrentPage(pageNumber);
    setPage(pageNumber);
  }

  return userData.loading ? (
    <h2>Loading</h2>
  ) : userData.error ? (
    <h2>{userData.error}</h2>
  ) : userData.users ? (
    <div className="row">
      {/*<h1>num is {page}</h1>
      <h1>num is {typeof page}</h1>
      <h1>num is {per}</h1>
      <h1>num is {typeof per}</h1>*/}
      <aside className="col-md-4">
        <section className="user_info">
          <a href="/users/1"><img alt="Example User" className="gravatar" src="https://secure.gravatar.com/avatar/bebfcf57d6d8277d806a9ef3385c078d?s=50" /></a>
          <h1>Example User</h1>
          <span><a href="/users/1">view my profile</a></span>
          <span>50 microposts</span>
        </section>

        <section className="stats">
          <div className="stats">
            <a href="/users/1/following">
              <strong id="following" className="stat">
                49
              </strong> following
            </a>
            <a href="/users/1/followers">
              <strong id="followers" className="stat">
                38
              </strong> followers
            </a>
          </div>
        </section>

        <section className="micropost_form">
          <form encType="multipart/form-data" action="/microposts" acceptCharset="UTF-8" method="post">
            <input type="hidden" name="authenticity_token" value="yLrWeOdIA+uxQ+TqTYLd+V+Y+XmFjtwK6XIYnDqlX+wEzHZ9GrAS1VyIXIupY9/cQlRUqyifmKsQ594Kc8xY1A==" />

            <div className="field">
                <textarea placeholder="Compose new micropost..." name="micropost[content]" id="micropost_content">
                </textarea>
            </div>
            <input type="submit" name="commit" value="Post" className="btn btn-primary" data-disable-with="Post" />
            <span className="image">
              <input accept="image/jpeg,image/gif,image/png" type="file" name="micropost[image]" id="micropost_image" />
            </span>
          </form>
          {/* <script type="text/javascript">
              $("#micropost_image").bind("change", function() {
                  const size_in_megabytes = this.files[0].size / 1024 / 1024;
                  if (size_in_megabytes > 5) {
                      alert("Maximum file size is 5MB. Please choose a smaller file.");
                      $("#micropost_image").val("");
                  }
              });
          </script> */}
        </section>
      </aside>

      <div className="col-md-8">
        <h3>Micropost Feed</h3>
        <ol className="microposts">
          { feed_items.map((i, t) => (
              <li key={t} id= {'micropost-'+i.id} >
                <a href={'/users/'+i.user_id}>
                  <img alt={i.user_name} className="gravatar" src={"https://secure.gravatar.com/avatar/"+i.gravatar_id+"?s="+i.size} />
                </a>
                <span className="user"><a href={'/users/'+i.user_id}>{i.user_name}</a></span>
                <span className="content">{i.content}</span>
                <span className="timestamp">{'Posted '+i.timestamp+' days ago.'}</span>
              </li>
          ))}
        </ol>

        <Pagination
          activePage={page}
          itemsCountPerPage={per}
          totalItemsCount={total_count}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />

        {/*<ul className="pagination">
          <li className="first"><a href="/">&laquo; First</a></li>
          <li className="prev"><a rel="prev" href="/?page=5">&lsaquo; Prev</a></li>
          <li className="page gap disabled"><a href="#d">&hellip;</a></li>
          <li className="page"><a href="/?page=2">2</a></li>
          <li className="page"><a href="/?page=3">3</a></li>
          <li className="page"><a href="/?page=4">4</a></li>
          <li className="page"><a rel="prev" href="/?page=5">5</a></li>
          <li className="page active"><a href="#d">6</a></li>
          <li className="page"><a rel="next" href="/?page=7">7</a></li>
          <li className="page"><a href="/?page=8">8</a></li>
          <li className="page"><a href="/?page=9">9</a></li>
          <li className="page"><a href="/?page=10">10</a></li>
          <li className="page gap disabled"><a href="#d">&hellip;</a></li>
          <li className="next"><a rel="next" href="/?page=7">Next &rsaquo;</a></li>
          <li className="last"><a href="/?page=125">Last &raquo;</a></li>
        </ul>

        <ul className="pagination">
          <li className="page active"><a href="#d">1</a></li>
          <li className="page"><a rel="next" href="/?page=2">2</a></li>
          <li className="page"><a href="/?page=3">3</a></li>
          <li className="page"><a href="/?page=4">4</a></li>
          <li className="page"><a href="/?page=5">5</a></li>
          <li className="page gap disabled"><a href="#d">&hellip;</a></li>
          <li className="next"><a rel="next" href="/?page=2">Next &rsaquo;</a></li>
          <li className="last"><a href="/?page=125">Last &raquo;</a></li>
        </ul>

        <ul className="pagination">
          <li className="first"><a href="/">&laquo; First</a></li>
          <li className="prev"><a rel="prev" href="/?page=2">&lsaquo; Prev</a></li>
          <li className="page"><a href="/">1</a></li>
          <li className="page"><a rel="prev" href="/?page=2">2</a></li>
          <li className="page active"><a href="#d">3</a></li>
          <li className="page"><a rel="next" href="/?page=4">4</a></li>
          <li className="page"><a href="/?page=5">5</a></li>
          <li className="page"><a href="/?page=6">6</a></li>
          <li className="page"><a href="/?page=7">7</a></li>
          <li className="page gap disabled"><a href="#d">&hellip;</a></li>
          <li className="next"><a rel="next" href="/?page=4">Next &rsaquo;</a></li>
          <li className="last"><a href="/?page=125">Last &raquo;</a></li>
        </ul>
      */}
      </div>
  </div>
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

export default connect(
  mapStateToProps
)(Home)
