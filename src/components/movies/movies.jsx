import React, { Component } from "react";
import { getMovies } from "../../services/fakeMovieService";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: getMovies(),
    };
  }

  renderMovies = () => {
    return this.state.movies.map((movie) => {
      return (
        <tr key={movie._id}>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td>
            <button type="button" className="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    let moviesHtml;
    let counter = this.state.movies.length;

    if (counter <= 0) {
      moviesHtml = <p>No movies found!</p>;
    } else {
      moviesHtml = (
        <React.Fragment>
          <p>There are {counter} movies in the database.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>{this.renderMovies()}</tbody>
          </table>
        </React.Fragment>
      );
    }

    return <div className="table-responsive">{moviesHtml}</div>;
  }
}

export default Movies;
