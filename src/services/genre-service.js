import http from "./http";
import { apiUrl } from "./../config/index.json";

export function getGenres() {
	return http.get(apiUrl + '/genres');
}