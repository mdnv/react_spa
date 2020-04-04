import React from 'react';
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import Home from "./static_pages/Home";
import About from "./static_pages/About";
import Contact from "./static_pages/Contact";
import Help from "./static_pages/Help";
import './App.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Provider } from 'react-redux'
import store from './redux/store';
import CakeContainer from "./components/CakeContainer";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <CakeContainer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
