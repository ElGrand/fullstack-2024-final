import mongoose, {Document} from 'mongoose';

interface IMovie extends Document {
    title: string;
    year: number;
    actors: [];
    reviews: [];
}

const movieSchema = new mongoose.Schema<IMovie>({
    title: {
        type: String,
        required: [true, 'movie must have a title'],
        unique: true
    },
    year: {
        type: Number,
        required: [true, 'movie must have a release year']
    },
    actors: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Actor'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});


const Movie = mongoose.model<IMovie>('Movie', movieSchema, 'movies');
interface MovieTypeDocument extends IMovie, Document {}


export { Movie, IMovie, MovieTypeDocument };