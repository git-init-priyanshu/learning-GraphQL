import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_ALL_USERS, CREATE_USER_MUTATION } from "../queries/users";
import { userDetails, user } from "../types/userTypes";

const DisplayData = () => {
  // User State
  const [userDetails, setuserDetails] = useState<userDetails>({
    name: null,
    username: null,
    age: null,
    nationality: null,
  });

  // Writing to the data using useMutation hook
  /**
   * Defining this piece of code before useQuery hook
   * If we don't do that then we will get an error
   * Error: Rendered more hooks than during the previous render
   * This occurs when we conditionally call a hook or return early before all hooks have run
   * In useQuery hook it returns <p>...</p> while loading data
   * So it returns before useMutation hook ever ran and this breaks the code
   */
  const [createUser, { error: mutationError }] =
    useMutation(CREATE_USER_MUTATION);
  if (mutationError) {
    console.log(mutationError);
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    createUser({
      variables: {
        input: {
          name: userDetails.name,
          username: userDetails.username,
          age: userDetails.age,
          nationality: userDetails.nationality,
        },
      },
    });

    // Refecthing the new data
    refetch();
  };

  // Getting data from the server using useQuery hook
  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  if (loading) {
    return <p>Data is loading ...</p>;
  }
  if (error) {
    console.log(error);
  }

  return (
    <>
      <form className="m-3" onSubmit={handleOnSubmit}>
        <div className="row">
          {/* Name */}
          <div className="col-12 col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name..."
              name="name"
              value={userDetails.name ? userDetails.name : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setuserDetails({ ...userDetails, name: e.target.value });
              }}
            />
          </div>
          {/* Username */}
          <div className="col-12 col-md-6">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username..."
              name="username"
              value={userDetails.username ? userDetails.username : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setuserDetails({ ...userDetails, username: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="row">
          {/* age */}
          <div className="col-12 col-md-6">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              placeholder="Age..."
              name="age"
              value={userDetails.age ? userDetails.age : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setuserDetails({ ...userDetails, age: Number(e.target.value) });
              }}
            />
          </div>
          {/* Nationality */}
          <div className="col-12 col-md-6">
            <label className="form-label">Nationality</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nationality..."
              name="nationality"
              value={userDetails.nationality ? userDetails.nationality : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setuserDetails({
                  ...userDetails,
                  nationality: e.target.value.toUpperCase(),
                });
              }}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>

      <h1 className="m-3">All Users</h1>
      <div className="d-flex flex-wrap">
        {data &&
          data.users.map((user: user) => {
            return (
              <div key={user.id} className="card m-3">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">Username: {user.username}</p>
                  <p className="card-text">Age: {user.age}</p>
                  <p className="card-text">Nationality: {user.nationality}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default DisplayData;
