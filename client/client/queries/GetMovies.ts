import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ACTORS = gql`
query{
    movies {
      _id
      age
      name
      actors {
        _id
      }
      reviews {
        _id
      }
    }
  }
`;