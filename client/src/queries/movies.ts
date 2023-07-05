import { gql } from "@apollo/client";

export const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
    }
  }
`;

export const QUERY_MOVIE = gql`
  query GetMovie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
      isInTheaters
      img
    }
  }
`;
