import React from 'react';
import Form from "./../common/form";
import Joi from "joi-browser";
import * as userService from "./../../services/user-service";
import auth from "./../../services/auth-service";

class RegisterForm extends Form {
	state = {
		data: {
			name: "",
			email: "",
			password: ""
		},
		errors: {}
	};

	schema = {
		name: Joi.string().required().label('Name'),
		email: Joi.string().required().email().label('Email'),
		password: Joi.string().required().min(5).label('Password')
	};

	doSubmit = async () => {
		try {
			const response = await userService.register(this.state.data);
			auth.loginWithJwt(response.headers['x-auth-token']);
			// this.props.history.push('/');
			window.location = '/';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.email = ex.response.data;
				this.setState({
					errors
				});
			}
		}
	};

	render() {
		return (<div>
			<h1>Register</h1>
			<form onSubmit={this.handleSubmit}>
				{this.renderInput('name', 'Name')}

				{this.renderInput('email', 'Email', 'email')}

				{this.renderInput('password', 'Password', 'password')}

				{this.renderButton('Register')}
			</form>
		</div>);
	}
}

export default RegisterForm;