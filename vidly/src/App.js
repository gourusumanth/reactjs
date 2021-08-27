import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Movies from './components/Movies'
import Customers  from "./components/customers"
import NavBar from './components/common/navbar';
import Rentals from "./components/rentals";
import NotFound from './components/notFound';
import MovieForm from './components/movieform';
import LoginForm from './components/loginform';
import RegisterForm from './components/registerform';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>

            <Route path="/login" component={LoginForm}/>
            <Route path="/register" component={RegisterForm}/>
            {/* <Route path="/movies/new" component={MovieForm}/> */}
            <Route path="/movies/:id" render = {(props) => <MovieForm {...props}/>}/>
            <Route path="/movies" component={Movies}/>
            <Route path="/customers" component={Customers}/>
            <Route path="/rentals" component={Rentals}/>
            <Route path="/not-found" component={NotFound}/>
            <Redirect from="/" exact to="/movies"/>
            <Redirect to="/not-found"/>
          </Switch>
       </main>
      </React.Fragment>
     
       
    );
  }
}

export default App;
