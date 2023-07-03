const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User!] 
    favouriteMovies: [Movie]
  }

  type Movie{
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!

    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  enum Nationality{
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
  }
`;

export default typeDefs;
