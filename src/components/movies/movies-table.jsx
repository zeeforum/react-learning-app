import React, { Component } from 'react';
import Table from "../common/table";
import Favorite from "../common/favorite";
import { Link } from "react-router-dom";
import auth from "./../../services/auth-service";

class MoviesTable extends Component {
	columns = [
		{
			path: 'title',
			label: 'Title',
			content: movie => (
				<Link to={`/movies/${movie._id}`}>{movie.title}</Link>
			)
		},
		{ path: 'genre.name', label: 'Genre' },
		{ path: 'numberInStock', label: 'Stock' },
		{ path: 'dailyRentalRate', label: 'Rate' },
		{
			key: 'like', content: movie => (
				<Favorite onClick={() => this.props.onLike(movie)} favorite={movie.liked} />
			)
		}
	];

	deleteColumn = {
		key: 'options', content: movie => (

			<button
				type="button"
				className="btn btn-danger"
				onClick={() => this.props.onDelete(movie)}
			>
				Delete
			</button>
		)
	};

	constructor(props) {
		super(props);

		const user = auth.getCurrentUser();
		if (user && user.isAdmin) {
			this.columns.push(this.deleteColumn);
		}
	}

	render() {
		const { movies, onSort, sortColumn } = this.props;

		return (
			<Table
				data={movies}
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
			/>
		);
	}
}

export default MoviesTable;