import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listgroup";
import MoviesTable from "./moviestable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: {path: 'title', order: 'asc'}
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((mov) => mov._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });

    console.log("Movie Liked:", movie);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    this.setState({ slectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
   
    this.setState({sortColumn});
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      slectedGenre,
      sortColumn
    } = this.state;
    
    const filteredMovies =
      slectedGenre && slectedGenre._id
        ? allMovies.filter((m) => m.genre._id === slectedGenre._id)
        : allMovies;
    const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies};
  }

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres: allGenres,
      sortColumn
    } = this.state;

    if (count === 0) {
      return <p>There are no movies in the database!</p>;
    }


    const {totalCount, data:movies} = this.getPageData();
    
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            genres={allGenres}
            slectedGenre={this.state.slectedGenre}
            onGenreSelect={this.handleGenreChange}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
