const typeDefs = `
type Movie {
    _id: String! 
    title: String!
    year: Int!
    actors: [Actor]
    reviews: [Review]
  }

  type Actor {
    _id: String!
    name: String!
    age: Int!
    movies: [Movie]
  }

  type Review {
    _id: String!
    description: String!
    rating: Int!
    movies: [Movie]
  }

  type Query {
    movies: [Movie!]!
    movie(id: ID): Movie
    actor(id: ID): Actor
    actors: [Actor!]!
    reviews: [Review!]!
    review(id: ID): Review
  }

  type Mutation {
    addMovie(title: String!, year: Int!): Movie
    deleteMovie(id: ID!): Boolean
    addActor(name: String!, age: Int!): Actor
    addReview(description: String!, rating: Int!): Review
    createMovie(title: String!, year: Int!): Movie
    updateMovie(id: ID!, title: String!, year: Int!): Movie
    addActorToMovie(actorId: ID!, movieId: ID!): Movie
    addReviewToMovie(reviewId: ID!, movieId: ID!): Movie
    addMovieToActor(movieId: ID!, actorId: ID!): Actor
    

  }
`;

export default typeDefs;