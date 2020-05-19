import React from "react";
import {
  Route,
  Switch,
  BrowserRouter
} from "react-router-dom"
import { toast } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import routes from './routes'
import { Provider } from 'react-redux'
import store from './redux/store'
import HttpsRedirect from 'react-https-redirect';

toast.configure({
  autoClose: 8000,
  draggable: false,
  position: toast.POSITION.TOP_CENTER,
});
const App = () => {
  return (
    <HttpsRedirect>
    <Provider store={store}>
    <BrowserRouter>
    <div className="App">
      <Header />

      <div className="container">
        <Switch>
        {routes.map((route, index) => (
          <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
          />
        ))}
        </Switch>

        <Footer />
      </div>
    </div>
    </BrowserRouter>
    </Provider>
    </HttpsRedirect>
  );
}

export default App;
