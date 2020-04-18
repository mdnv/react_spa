import React, { useState, useEffect } from "react";
import axios from 'axios'
import Pagination from 'react-js-pagination'

function Todo({ u, i, removeTodo }) {
  return (
    <li>
      <img alt={u.name} className="gravatar" src={"https://secure.gravatar.com/avatar/"+u.gravatar_id+"?s="+u.size} />
      <a href="/users/5">{u.name}</a>
        | <a data-confirm="You sure?" rel="nofollow" data-method="delete" href="/users/5">delete</a>
        <button onClick={() => removeTodo(i)}>x</button>
    </li>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: "Learn about React",
    },
    {
      text: "Meet friend for lunch",
    },
    {
      text: "Build really cool todo app",
    }
  ]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total_count, setTotalCount] = useState(1);

  useEffect(() => {
    axios
      .get(
        'http://localhost:3000/api/users',
        {params: {page: page},
        withCredentials: true }
      )
      .then(response => {
        console.log(response)
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

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  const handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    setPage(pageNumber);
  }

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
    <Todo
      key={i}
      i={i}
      u={u}
      removeTodo={removeTodo}
    />
  ))}
  {/* <TodoForm addTodo={addTodo} /> */}
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

export default App;
