import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { QUERY_MOVIE } from "../queries/movies";

const DisplayMovie = () => {
  const [movieSearched, setMovieSearched] = useState("");

  const [fetchMovie, { loading, data, error }] = useLazyQuery(QUERY_MOVIE, {
    variables: { name: "Superbad" },
  });

  if (loading) return <p>Loading ...</p>;
  if (error) {
    console.log(error);
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // fetchMovie();
    fetchMovie({ variables: { name: movieSearched } });
  };

  return (
    <div>
      <h1 className="m-3">Movie details</h1>
      <form onSubmit={handleOnSubmit} className="d-flex m-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Movie Name..."
          value={movieSearched}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setMovieSearched(e.target.value);
          }}
        />
        <button type="submit" className="btn btn-success">
          Get movie details
        </button>
      </form>
      <div>
        {data && (
          <div className="card m-3">
            <div className="card-body">
              <p className="card-text">Name: {data.movie.name}</p>
              <p className="card-text">
                Year of Publication: {data.movie.yearOfPublication}
              </p>
              <p className="card-text">
                Is in Theaters?: {data.movie.isInTheaters ? "Yes" : "No"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayMovie;
