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
import CakeContainer from "./components/CakeContainer";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <CakeContainer />
    </div>
    </BrowserRouter>
  );
}

export default App;
