import React, { Component } from 'react'
import Movies from "./components/movies";
import { ToastContainer } from "react-toastify";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./components/notFound";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from "./components/common/navbar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NewMovieForm from "./components/newMovieForm";
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute'
import auth from './services/authService';
import "react-toastify/dist/ReactToastify.css"
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
  return (
    <>
      <ToastContainer/>
      <NavBar user={user} />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/logout" component={Logout} />
          <ProtectedRoute path="/movies/:id" component={NewMovieForm}></ProtectedRoute>
           <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            />
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}
}
export default App;
