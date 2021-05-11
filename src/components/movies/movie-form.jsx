import React from 'react';
import Joi from "joi-browser";

import Form from "./../common/form";
import { getGenres } from "./../../services/genre-service";
import { getMovie, saveMovie } from "./../../services/movie-service";

class MoviesForm extends Form {
	state = {
		data: {
			title: "",
			genreId: "",
			numberInStock: "",
			dailyRentalRate: ""
		},
		genres: [],
		errors: {}
	};

	schema = {
		_id: Joi.string(),
		title: Joi.string().required().label('Title'),
		genreId: Joi.string().required().label('Genre'),
		numberInStock: Joi.number().min(0).max(100).label('Number in Stock'),
		dailyRentalRate: Joi.number().min(0).max(10).label('Rental')
	};

	async populateGenres() {
		const { data: genres } = await getGenres();
		this.setState({
			genres
		});
	}

	async populateMovie() {
		const movieId = this.props.match.params.id;

		if (movieId === 'new') return;

		try {
			const { data: movie } = await getMovie(movieId);
			this.setState({
				data: this.mapToViewModel(movie)
			})
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				this.props.history.replace('/not-found');
		}
	}

	async componentDidMount() {
		await this.populateGenres();
		await this.populateMovie();
	}

	mapToViewModel(movie) {
		return {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate
		};
	}

	initializeForm() {
		// const { match } = this.props;
		// let id = match.params.id;
	}

	doSubmit = async () => {
		await saveMovie(this.state.data);
		this.props.history.push('/movies');
	}

	render() {
		return (<div>
			<h1>Movie Form</h1>
			<form onSubmit={this.handleSubmit}>
				{this.renderInput('title', 'Title')}

				{this.renderSelect('genreId', 'Genre', this.state.genres)}

				{this.renderInput('numberInStock', 'Number in Stock')}

				{this.renderInput('dailyRentalRate', 'Rate')}

				{this.renderButton('Save')}
			</form>
		</div>);
	}
}

export default MoviesForm;