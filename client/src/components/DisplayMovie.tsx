import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import { QUERY_MOVIE } from "../queries/movies";

interface movieProps {
  movieName: string;
}

const DisplayMovie = ({ movieName }: movieProps) => {
  const [movieSearched, setMovieSearched] = useState<string>("");

  useEffect(() => {
    fetchMovie({ variables: { name: movieName } });
  }, [movieName]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchMovie({ variables: { name: movieSearched } });
  };

  const [fetchMovie, { loading, data, error }] = useLazyQuery(QUERY_MOVIE);
  if (loading) return <p>Loading ...</p>;
  if (error) {
    console.log(error);
  }

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
            <div className="row g-0">
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title fs-1">{data.movie.name}</h5>
                  <p className="card-text">{data.movie.yearOfPublication}</p>
                  <p className="card-text">
                    {data.movie.isInTheaters
                      ? "In theaters now!"
                      : "Comming Soom"}
                  </p>
                </div>
              </div>
              <div
                className="col-md-6 d-flex justify-content-center align-items-center"
                style={{ height: "30rem", backgroundColor: "#e2e2e2" }}
              >
                <img
                  src={data.movie.img}
                  alt=""
                  style={{ objectFit: "contain", height: "100%" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayMovie;
