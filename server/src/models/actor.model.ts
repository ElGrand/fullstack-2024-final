import mongoose, {Document} from 'mongoose';

interface IActor extends Document {
    name: string;
    age: number;
    movies: [];
}

const actorSchema = new mongoose.Schema<IActor>({
    name: {
        type: String,
        required: [true, 'actor must have a name'],
        unique: true
    },
    age: {
        type: Number,
        required: [true, 'actor must have an age']
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Movie'
    }]
});


const Actor = mongoose.model<IActor>('Actor', actorSchema, 'actors');
interface ActorTypeDocument extends IActor, Document{}

export { Actor, IActor, ActorTypeDocument };