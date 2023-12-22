import {gql} from "@apollo/client";

const GET_MOVIES = gql`
    query GetMovies {
        movies {
            _id
            title
            year
            actors {
                _id
                name
            }
        }
    }
`;

export { GET_MOVIES }