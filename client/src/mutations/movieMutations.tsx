import { gql } from '@apollo/client';

const CREATE_MOVIE = gql`
    mutation CREATE_MOVIE($title: String!, $year: Int!) {
        createMovie(title: $title, year: $year) {
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

const DELETE_MOVIE = gql`
    mutation DeleteMovie($id: ID!) {
  deleteMovie(id: $id)
}
`;

export { DELETE_MOVIE, CREATE_MOVIE };