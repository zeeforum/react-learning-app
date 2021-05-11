import http from "./http";
import { apiUrl } from "./../config/index.json";

const apiEndpoint = apiUrl + '/movies';

function movieUrl(movieId) {
  return `${apiEndpoint}/${movieId}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(id) {
	return http.get(movieUrl(id));
}

export function saveMovie(data) {
  if (data._id) {
    const body = {...data};
    delete body._id;
    return http.put(movieUrl(data._id), body);
  }

  return http.post(apiEndpoint, data);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
