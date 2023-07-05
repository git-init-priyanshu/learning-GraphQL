import { useState } from "react";
import { useQuery } from "@apollo/client";

import DisplayMovie from "./DisplayMovie";
import { QUERY_ALL_MOVIES } from "../queries/movies";
import { movie } from "../types/movieTypes";

const DisplayMovies = () => {
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  const [searchMovie, setSearchMovie] = useState<string>("");

  return (
    <>
      <h1 className="d-flex m-3">All Movies</h1>
      <div className="d-flex flex-wrap m-3 gap-3">
        {movieData &&
          movieData.movies.map((movie: movie) => {
            return (
              <button
                key={movie.name}
                onClick={() => {
                  setSearchMovie(movie.name);
                }}
                className="btn btn-outline-primary"
              >
                {movie.name}
              </button>
            );
          })}
      </div>
      <hr />
      <DisplayMovie movieName={searchMovie} />
    </>
  );
};

export default DisplayMovies;
