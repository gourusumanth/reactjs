import React from "react";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import Joi from 'joi-browser';
import { getGenres } from '../services/fakeGenreService';
import Form from './common/form';

class MovieForm extends Form {

    state = { 
        data: {title:"", genreId: "", numberInStock: "", dailyRentalRate: ""},
        genres:[],
        errors: {
        }
     }

     schema = {
         _id: Joi.string(),
         title: Joi.string().required().label("Title"),
         genreId: Joi.string().required().label("Genre"),
         numberInStock: Joi.number().min(0).max(100).label("Number In Stock"),
         dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
     }

     componentDidMount() {
         const genres = getGenres();
         console.log("Component mounted:", genres);
         this.setState({ genres });

         const movieId = this.props.match.params.id;
         if(movieId === "new") return;

         const movie = getMovie(movieId);
         if(!movie) return this.props.history.replace("/not-found");

         this.setState({ data: this.mapToViewModel(movie)});

         
     }

     mapToViewModel(movie) {
         return {
             _id: movie._id,
             title: movie.title,
             genreId:movie.genre._id,
             numberInStock: movie.numberInStock,
             rate: movie.rate
         }
     }

     doSubmit = () => {
         saveMovie(this.state.data);
         this.props.history.push("/movies");
     }


     render() {
        return ( 
            <div>
                <h1>Register Movie</h1>
                <form onSubmit={this.handleSubmit}>
                     {this.renderInput("title", "Title")}
                     {this.renderSelect("genreId", "Genre", this.state.genres)}
                     {this.renderInput("numberInStock", "Number In Stock", "number")}
                     {this.renderInput("dailyRentalRate", "Rate", "number")}
                     {this.renderButton("Save")}
                </form>
            </div>
         );
     }
        
    

//   return (
//     <div>
//       <h1>Movie Form: {match.params.id}</h1>
//       <button
//         className="btn btn-primary"
//         onClick={() => history.push("/movies")}
//       >
//         Save
//       </button>
//     </div>
//   );
};

export default MovieForm;
