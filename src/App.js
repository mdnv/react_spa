import React from "react";
import {
  Route,
  Switch,
  BrowserRouter
} from "react-router-dom"
import { toast } from 'react-toastify';
import Home from "./static_pages/Home"
import About from "./static_pages/About"
import Contact from "./static_pages/Contact"
import Help from "./static_pages/Help"
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import Users from './components/UsersContainer'
import UserNew from './users/New'
import UserShow from './users/Show'
import UserEdit from './users/Edit'
import SessionNew from './sessions/New'
import Header from './layouts/Header'
import Footer from './layouts/Footer'

import { Provider } from 'react-redux'
import store from './redux/store'

toast.configure({
  autoClose: 8000,
  draggable: false,
  //etc you get the idea
});
const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div className="App">
      <Header />

      <div className="container">
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/help" component={Help}/>
        <Route exact path="/users" component={Users}/>
        <Route exact path="/users/new" component={UserNew}/>
        <Route exact path="/users/:id" component={UserShow}/>
        <Route exact path="/users/:id/edit" component={UserEdit}/>
        <Route exact path="/signup" component={UserNew}/>
        <Route exact path="/login" component={SessionNew}/>
        </Switch>

        <Footer />
      </div>
    </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
