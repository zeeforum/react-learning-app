import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from "@fortawesome/free-regular-svg-icons";

import RegisterForm from "./components/auth/register-form";
import LoginForm from './components/auth/login-form';
import Customers from "./components/customers";
import Rental from "./components/rental";
import NotFound from "./components/not-found";
import Movies from "./components/movies/movies";
import MoviesForm from "./components/movies/movie-form";
import NavBar from "./components/navbar";
import Logout from './components/auth/logout';
import ProtectedRoute from "./components/common/protected-route";

import auth from "./services/auth-service";

import './App.css';
import "react-toastify/dist/ReactToastify.css";

library.add(fas, far);

class App extends React.Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({
			user
		});
	}

	render() {
		const { user } = this.state;
		return (
			<React.Fragment>
				<ToastContainer />
				<NavBar user={user} />
				<div className="container mt-3">
					<Switch>
						<Route path="/register" component={RegisterForm} />
						<Route path="/login" component={LoginForm} />
						<Route path="/logout" component={Logout} />
						<Route path="/customers" component={Customers} />
						<Route path="/rental" component={Rental} />
						<ProtectedRoute path="/movies/:id" component={MoviesForm} />
						<Route path="/movies" render={props => <Movies {...props} user={this.state.user} />} />
						<Route path="/not-found" component={NotFound} />
						<Redirect from="/" to="/movies" exact />
						<Redirect to="/not-found" />
					</Switch>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
