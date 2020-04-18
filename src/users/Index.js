import React, { useState, useEffect } from "react";
import axios from 'axios'
import Pagination from 'react-js-pagination'
import { useSelector } from 'react-redux'
import flashMessage from '../shared/flashMessages'

export default function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total_count, setTotalCount] = useState(1);
  const userData = useSelector(state => state.user)
  const current_user = userData.users;

  useEffect(() => {
    axios
      .get(
        'http://localhost:3000/api/users',
        {params: {page: page},
        withCredentials: true }
      )
      .then(response => {
        if (response.data.users) {
          setUsers(response.data.users);
          setTotalCount(response.data.total_count);
        } else {
          setUsers([]);
        }
      })
      .catch(error => {
        console.log(error)
      });
  }, [page])

  const handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    setPage(pageNumber);
  }

  const removeUser = (index, userid) => {
    axios
      .delete(
        'http://localhost:3000/api/users/'+userid, { withCredentials: true }
      )
      .then(response => {
        if (response.data.flash) {
          const newUsers = [...users];
          newUsers.splice(index, 1);
          setUsers(newUsers);
          flashMessage(...response.data.flash);
        }
      })
      .catch(error => {
        console.log(error)
      });
  };

  return (
    <>
    <h1>All users</h1>

    <Pagination
      activePage={page}
      itemsCountPerPage={5}
      totalItemsCount={total_count}
      pageRangeDisplayed={5}
      onChange={handlePageChange}
    />

    <ul className="users">
      {users.map((u, i) => (
      <li key={i}>
        <img alt={u.name} className="gravatar" src={"https://secure.gravatar.com/avatar/"+u.gravatar_id+"?s="+u.size} />
        <a href={'/users/'+u.id}>{u.name}</a>
        {
          current_user.admin && current_user.id !== u.id ? (
            <>
            | <a href={'#/users/'+u.id} onClick={() => removeUser(i, u.id)}>delete</a>
            </>
          ) : (
            <></>
          )
        }
      </li>
      ))}
    </ul>

    <Pagination
      activePage={page}
      itemsCountPerPage={5}
      totalItemsCount={total_count}
      pageRangeDisplayed={5}
      onChange={handlePageChange}
    />
    </>
  );
}
