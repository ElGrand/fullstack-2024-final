import { useQuery } from '@apollo/client';
import MovieRow from './MovieRow';
import Spinner from "./Spinner.tsx";
import { GET_MOVIES } from '../queries/movieQueries';

interface Movie {
    _id: string;
    title: string;
    year: number;
    actors: {
        _id: string;
        name: string;
    }[];
}

interface GetMoviesData {
    movies: Movie[];
}


export default function Movies() {
    const { loading, error, data } = useQuery<GetMoviesData>(GET_MOVIES)

    if (loading) return <Spinner/>
    if (error) return <p>Something Went Wrong</p>
    return (
        <>
            { !loading && !error && (
                <table className='table table-hover mt-3'>
                    <thead>
                        <tr>
                            <th>Title</th><th>Year</th><th>Actors</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.movies.map((movie: Movie) => (
                        <MovieRow key={movie._id} movie={movie} />
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
}