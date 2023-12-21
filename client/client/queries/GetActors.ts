import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ACTORS = gql`
query{
    actors {
      _id
      age
      name
      movies {
        _id
      }
    }
  }
`;