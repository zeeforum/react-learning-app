import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";

import { deleteMovie, getMovies } from "../../services/movie-service";
import MoviesTable from "./movies-table";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import { getGenres } from "../../services/genre-service";
import ListGroup from "../common/list-group";
import SearchBox from "./../common/search-box";

class Movies extends Component {

	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		searchQuery: "",
		selectedGenre: null,
		sortColumn: {
			path: 'title',
			order: 'asc'
		}
	};

	async componentDidMount() {
		const { data } = await getGenres();
		const genres = [
			{
				_id: "",
				name: "All Genres"
			},
			...data
		]

		const { data: movies } = await getMovies();
		this.setState({
			movies,
			genres
		});
	}

	handleDelete = async (movie) => {
		const originalMovies = this.state.movies;
		const movies = this.state.movies.filter((m) => movie._id !== m._id);
		this.setState({
			movies,
		});

		try {
			await deleteMovie(movie._id);
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				toast.error('This movie has already been deleted.');

			this.setState({
				movies: originalMovies
			})
		}
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);

		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;

		this.setState({ movies });
	};

	handleSort = sortColumn => {
		this.setState({
			sortColumn
		});
	};

	handlePageChange = page => {
		this.setState({ currentPage: page });
	}

	handleGenreSelect = genre => {
		this.setState({
			selectedGenre: genre,
			currentPage: 1,
			searchQuery: ""
		});
	};

	getPageData = () => {
		const {
			pageSize,
			currentPage,
			sortColumn,
			movies: allMovies,
			selectedGenre,
			searchQuery
		} = this.state;

		let filtered = allMovies;

		if (searchQuery) {
			filtered = allMovies.filter(m =>
				m.title.toLowerCase().includes(searchQuery.toLowerCase())
			);
		} else if (selectedGenre && selectedGenre._id) {
			filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
		}

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const movies = paginate(sorted, currentPage, pageSize);

		return {
			totalCount: filtered.length,
			data: movies
		};
	};

	handleSearch = query => {
		this.setState({
			searchQuery: query,
			selectedGenre: null,
			currentPage: 1
		});
	};

	render() {
		const { length: counter } = this.state.movies;
		const {
			pageSize,
			currentPage,
			sortColumn,
			searchQuery
		} = this.state;
		const { user } = this.props;

		if (counter <= 0) return <p>No movies found!</p>;

		const { totalCount, data: movies } = this.getPageData();

		return (
			<React.Fragment>
				<div className="row">
					<div className="col-12 col-sm-4">
						<ListGroup
							items={this.state.genres}
							selectedItem={this.state.selectedGenre}
							onItemSelect={this.handleGenreSelect} />
					</div>

					<div className="col-12 col-sm-8">
						{user && (<Link to="/movies/new" className="btn btn-primary mb-2">
							New Movie
						</Link>)}

						<SearchBox value={searchQuery} onChange={this.handleSearch} />

						<p>There are {totalCount} movies in the database.</p>
						<MoviesTable
							movies={movies}
							onLike={this.handleLike}
							onDelete={this.handleDelete}
							sortColumn={sortColumn}
							onSort={this.handleSort}
						/>

						<Pagination
							itemsCount={totalCount}
							pageSize={pageSize}
							onPageChange={this.handlePageChange}
							currentPage={currentPage}
						/>
					</div>
				</div>
			</React.Fragment >
		);
	}
}

export default Movies;
