import mongoose, {Document} from 'mongoose';

interface IReview extends Document {
    description: string;
    rating: number;
    movies: [];
}

const reviewSchema = new mongoose.Schema<IReview>({
    description: {
        type: String,
        required: [true, 'description of movie requiered'],
        unique: true
    },
    rating: {
        type: Number,
        required: [true, 'movie require a rating'],
        min: [1,'min 1 star'],
        max: [10, 'max 10 star']
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Movies'
    }]
});


const Review = mongoose.model<IReview>('Review', reviewSchema, 'reviews');


export { Review, IReview };