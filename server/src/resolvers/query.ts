import { IMovie, Movie } from '../models/movie.model';
import { Actor, IActor } from '../models/actor.model';
import { Review } from '../models/review.model';

export default {
    movies: async () => await Movie.find({}),
    actors: async () => await Actor.find({}),
    reviews: async () => await Review.find({}),
    // movie arg id : Movie
}