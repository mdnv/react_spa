import React, { useState, useEffect }  from 'react'
import axios from 'axios'
import logo from '../logo.svg'
import {
  NavLink,
} from "react-router-dom"
import { connect } from 'react-redux'
import Pagination from 'react-js-pagination'
import { useQueryParam, NumberParam } from 'use-query-params'
import flashMessage from '../shared/flashMessages'
import Pluralize from 'react-pluralize'
import Skeleton from 'react-loading-skeleton';

const Home = ({ userData }) => {
  const [page, setPage] = useQueryParam('page', NumberParam);
  const [per, setPer] = useQueryParam('per', NumberParam);
  if ((typeof per) == "undefined") { setPer(5) }
  const [feed_items, setFeedItems] = useState([]);
  const [total_count, setTotalCount] = useState(1);
  const [current_page, setCurrentPage] = useState(page);
  if ((typeof page) == "undefined") { setPage(current_page) }
  const [following, setFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [micropost, setMicropost] = useState();
  const [gravatar, setGavatar] = useState();
  const [content, setContent] = useState('');
  // const [image, setImage] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://railstutorialapi.herokuapp.com/api',
        {params: {page: page, per: per},
        withCredentials: true }
      )
      .then(response => {
        if (response.data.feed_items) {
          setFeedItems(response.data.feed_items);
          setTotalCount(response.data.total_count);
          setFollowing(response.data.following);
          setFollowers(response.data.followers);
          setMicropost(response.data.micropost);
          setGavatar(response.data.gravatar);
        } else {
          setFeedItems([]);
        }
      })
      .catch(error => {
        console.log(error)
      });
  }, [page, per])

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
    setPage(pageNumber);
  }

  const handleContentInput = e => {
    setContent(e.target.value);
  };
  // const handleImageInput = e => {
  //   setImage(e.target.value);
  // };

  const handleSubmit = (e) => {
    axios
      .post(
        "https://railstutorialapi.herokuapp.com/api/microposts",
        {
          micropost: {
            content: content
            // image: image
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.flash) {
          flashMessage(...response.data.flash)
          setContent('')
          setErrorMessage('')
          axios
            .get(
              'https://railstutorialapi.herokuapp.com/api',
              {params: {page: page, per: per},
              withCredentials: true }
            )
            .then(response => {
              if (response.data.feed_items) {
                setFeedItems(response.data.feed_items);
                setTotalCount(response.data.total_count);
                setMicropost(response.data.micropost);
              } else {
                setFeedItems([]);
              }
            })
            .catch(error => {
              console.log(error)
            });
        }
        if (response.data.error) {
          setErrorMessage(response.data.error)
        }
      })
      .catch(error => {
        console.log(error)
      });
    e.preventDefault();
  }

  const removeMicropost = (index, micropostid) => {
    axios
      .delete(
        'https://railstutorialapi.herokuapp.com/api/microposts/'+micropostid, { withCredentials: true }
      )
      .then(response => {
        if (response.data.flash) {
          flashMessage(...response.data.flash)
          axios
            .get(
              'https://railstutorialapi.herokuapp.com/api',
              {params: {page: page, per: per},
              withCredentials: true }
            )
            .then(response => {
              if (response.data.feed_items) {
                setFeedItems(response.data.feed_items);
                setTotalCount(response.data.total_count);
                setMicropost(response.data.micropost);
              } else {
                setFeedItems([]);
              }
            })
            .catch(error => {
              console.log(error)
            });
        }
      })
      .catch(error => {
        console.log(error)
      });
  };

  return userData.loading ? (
    <>
    <Skeleton height={304} />
    <Skeleton circle={true} height={60} width={60} />
    </>
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
          <img alt={userData.users.name} className="gravatar" src={"https://secure.gravatar.com/avatar/"+gravatar+"?s=50"} />
          <h1>{userData.users.name}</h1>
          <span><NavLink to={"/users/"+userData.users.id}>view my profile</NavLink></span>
          <span><Pluralize singular={'micropost'} count={ micropost } /></span>
        </section>

        <section className="stats">
          <div className="stats">
            <NavLink to={"/users/"+userData.users.id+"/following"}>
              <strong id="following" className="stat">
                {following}
              </strong> following
            </NavLink>
            <NavLink to={"/users/"+userData.users.id+"/followers"}>
              <strong id="followers" className="stat">
                {followers}
              </strong> followers
            </NavLink>
          </div>
        </section>

        <section className="micropost_form">
          <form
          encType="multipart/form-data"
          action="/microposts"
          acceptCharset="UTF-8"
          method="post"
          onSubmit={handleSubmit}
          >
            { errorMessage &&
              <div id="error_explanation">
                <div className="alert alert-danger">
                  The form contains { errorMessage.length } error.
                </div>
                <ul>
                  { errorMessage.map((error, i) => {
                     return (<li key={i}>{error}</li>)
                  })}
                </ul>
              </div>
            }
            <div className="field">
                <textarea
                placeholder="Compose new micropost..."
                name="micropost[content]"
                id="micropost_content"
                value={content}
                onChange={handleContentInput}
                >
                </textarea>
            </div>
            <input type="submit" name="commit" value="Post" className="btn btn-primary" data-disable-with="Post" />
            {/* <span className="image">
              <input
              accept="image/jpeg,image/gif,image/png"
              type="file"
              name="micropost[image]"
              id="micropost_image"
              value={Image}
              onChange={handleImageInput}
              />
            </span>*/}
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
                <span className="content">
                  {i.content}
                </span>
                <span className="timestamp">
                {'Posted '+i.timestamp+' ago. '}
                {userData.users.id === i.user_id &&
                  <a href={'#/microposts/'+i.id} onClick={() => removeMicropost(t, i.id)}>delete</a>
                }
                </span>
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
