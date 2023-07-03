import { MovieList, UserList } from "../data/fakeData.js";
import _ from "lodash";

const resolvers = {
  Query: {
    // User Resolvers
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    // Movie Resolvers
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name });
      return movie;
    },

    // Have to resolve the error
    // Error: Query.User defined in resolvers, but not in schema

    // User: {
    //   favouriteMovies: () => {
    //     return _.filter(
    //       MovieList,
    //       (movie) =>
    //         movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
    //     );
    //   },
    // },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      // Getting last id from users list
      const lastID = UserList[UserList.length - 1].id;
      /**
       *Generating new id for the new input
       *and pushing new user back to the list
       */
      user.id = lastID + 1;
      UserList.push(user);
      return user;
    },
    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let updatedUser;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          // Updating the username of the user
          user.username = newUsername;
          updatedUser = user;
        }
      });
      // Returning the updated user
      return updatedUser;
    },
    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },
};

export default resolvers;
