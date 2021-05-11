import http from "./http";
import { apiUrl } from "./../config/index.json";

const apiEndpoint = apiUrl + '/users';

export function register(user) {
	return http.post(apiEndpoint, user);
}