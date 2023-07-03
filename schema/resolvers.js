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

    User: {
      favouriteMovies: () => {
        return _.filter(
          MovieList,
          (movie) =>
            movie.yearOfPublication >= 2000 && yearOfPublication <= 2010
        );
      },
    },
  },
};

export default resolvers;
