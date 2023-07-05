import { useQuery } from "@apollo/client";

import DisplayMovie from "./DisplayMovie";
import { QUERY_ALL_MOVIES } from "../queries/movies";
import { movie } from "../types/movieTypes";

const DisplayMovies = () => {
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  return (
    <>
      <h1 className="d-flex m-3">All Movies</h1>
      <div className="d-flex flex-wrap m-3 gap-3">
        {movieData &&
          movieData.movies.map((movie: movie) => {
            return (
              <div key={movie.name} className="card">
                <div className="card-body">
                  <p className="card-text"> {movie.name}</p>
                </div>
              </div>
            );
          })}
      </div>
      <hr />
      <DisplayMovie />
    </>
  );
};

export default DisplayMovies;
