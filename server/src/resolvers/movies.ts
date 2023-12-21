import { Movie } from '../models/movie.model';

export default {
    movies: async () => await Movie.find({}),
    // movie: async (_parent:never, _args: {id: string }) => {
    //         const movie = await Movie.findById(_args.id);
    //         return movie;
    // }
}