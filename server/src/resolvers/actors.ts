import { IActor, ActorTypeDocument, Actor } from "../models/actor.model";
import { IMovie, MovieTypeDocument } from "../models/movie.model";

export default {
/* actors: async (actor:ActorTypeDocument): Promise<MovieTypeDocument[]> => {
    const populatedActor = (await actor.populate('movies'));
    return populatedActor.movies;
}, */
movies: async ()=> { const lst = await Actor.find({}).populate('movies'); console.log('POPULATE: ',lst); return lst},
//actor: async (_parent:never, { id }:{id:String}) => await Actor.findById(id).populate('address')

}