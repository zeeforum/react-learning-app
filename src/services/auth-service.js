import http from "./http";
import jwtDecode from "jwt-decode";

import { apiUrl } from "./../config/index.json";

const apiEndpoint = apiUrl + '/auth';
const TOKEN_KEY = 'token';

http.setJwt(getJwt());

export async function login(email, password) {
	const { data: jwt } = await http.post(apiEndpoint, {
		email,
		password
	});
	localStorage.setItem(TOKEN_KEY, jwt);
	// this.props.history.push('/');
}

export function loginWithJwt(jwt) {
	localStorage.setItem(TOKEN_KEY, jwt);
}

export function logout() {
	localStorage.removeItem(TOKEN_KEY);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(TOKEN_KEY);
		return jwtDecode(jwt);
	} catch (ex) {
		return null;
	}

}

export function getJwt() {
	return localStorage.getItem(TOKEN_KEY);
}

export default {
	login,
	loginWithJwt,
	logout,
	getCurrentUser,
	getJwt
};