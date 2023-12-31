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
    img: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!

    movies: [Movie!]!
    movie(name: String!): Movie!
  }
  
  input CreateUserInput{
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = INDIA#Default value
  }

  input UpdateUsernameInput{
    id: ID!
    newUsername: String!
  }

  type Mutation{
    createUser(input: CreateUserInput!): User
    updateUsername(input: UpdateUsernameInput!): User
    deleteUser(id: ID!): User
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
