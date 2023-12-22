import {FaTrash} from "react-icons/fa";
import {ApolloError, useMutation} from "@apollo/client";
import { DELETE_MOVIE } from "../mutations/movieMutations";
export default function MovieRow({ movie }: any) {
    const [deleteMovie] = useMutation(DELETE_MOVIE, {
        variables: { id: movie._id },
        update: (cache) => {
            cache.modify({
                fields: {
                    movies(existingMoviesRefs, { readField }) {
                        return existingMoviesRefs.filter(
                            (movieRef: any) => movie._id !== readField("_id", movieRef)
                        );
                    },
                },
            });
        }
    });

    const handleDeleteClick = async () => {
        console.log("Deleting movie...");
        try {
            await deleteMovie();
            console.log("Movie deleted successfully");
        } catch (error) {
            if (error instanceof ApolloError) {
                // Handle ApolloError, which provides more information
                console.error("Error deleting movie:", error.message, error.graphQLErrors, error.networkError);
            } else {
                // If error is not an instance of ApolloError, use type assertion
                const unknownError = error as unknown;
                console.error("Unknown error:", unknownError);
            }
        }
    };

    return (
        <tr>
            <td>{ movie.title }</td>
            <td>{ movie.year }</td>
            <td>
                { movie.actors.map((actor: any) => (
                    <span key={actor._id}>{ actor.name } </span>
                ))}
            </td>
            <td>
                <button className="btn btn-danger.btn-sm" onClick={handleDeleteClick}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
}