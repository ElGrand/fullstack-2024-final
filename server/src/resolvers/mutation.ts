import { Document, ObjectId } from 'mongoose';
import { Movie, IMovie, MovieTypeDocument } from '../models/movie.model';
import { Actor, IActor, ActorTypeDocument } from '../models/actor.model';
import { Review, IReview } from '../models/review.model';

export default {
    addMovie: async (_parent:never, {title, year}: {title: string, year: number}) => {
        const result = await Movie.create({
            title: title,
            year: year
        });
        return result;
    },
    deleteMovie: async (_parent:never, { id }:IMovie) => {
        const result = await Movie.findByIdAndDelete(id);
        return result ? true : false;
      },
    addActor: async (_parent:never, {name, age}: {name: string, age: number}) => {
        const result = await Actor.create({
            name: name,
            age: age
        });
        return result;
    },
    addReview: async (_parent:never, {description, rating}: {description: string, rating: number}) => {
        const result = await Review.create({
            description: description,
            rating: rating
        });
        return result;
    },
    createMovie: async (_parent:never, { title, year }:IMovie) => {
        const newMovie = new Movie({ title, year });
        await newMovie.save();
        return newMovie;
      },
      updateMovie: async (_parent:never, { id, title, year }:IMovie) => {
        const result = await Movie.findByIdAndUpdate(id, {title, year});
        return result;
      },
    addActorToMovie: async (_: any, args: { actorId: string; movieId: string }): Promise<IMovie | null> => {
        const movie = await Movie.findByIdAndUpdate(
          args.movieId,
          { $addToSet: { actors: args.actorId } },
          { new: true }
        ).populate('actors');
        return movie;
        },
    addReviewToMovie: async (_: any, args: { reviewId: string; movieId: string }): Promise<IMovie | null> => {
            const movie = await Movie.findByIdAndUpdate(
              args.movieId,
              { $addToSet: { reviews: args.reviewId } },
              { new: true }
            ).populate('reviews');
            return movie;
            },
    addMovieToActor: async (_: any, args: { movieId: string; actorId: string }): Promise<IActor | null> => {
                const movie = await Actor.findByIdAndUpdate(
                  args.actorId,
                  { $addToSet: { movies: args.movieId } },
                  { new: true }
                ).populate('movies');
                return movie;
                },
      // actor er adress og person er movie
       /* addActorToMovies: async (
        _parent: never,
        { actorId, movieId }: { actorId: string, movieId: string }
      ) => {
        try {
          const actor = await Actor.findById(actorId).populate('actors') as ActorTypeDocument;
          const movie : MovieTypeDocument | null = await Movie.findById(movieId);
  
          if (!movie) { throw new Error(`Movie with ID ${movieId} not found.`); }
          if (!actor) { throw new Error(`Actor with ID ${actorId} not found.`); }
          if (actor.movies.some((m: any) => m.id === movieId)) {
            throw new Error(`Movie with ID ${movieId} is already associated with actor with ID ${actorId}.`);
          }
          movie.actors = actor;
          actor.movies.push(movie._id);
          actor.movies.push();
          await actor.save();
          await movie.save();
          return actor;
          return true;
        } catch (error) {
          console.error(error);
          // return null;
          return false;
        }
      },  */

}