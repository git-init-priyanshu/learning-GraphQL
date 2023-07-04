import { useQuery } from "@apollo/client";

import QUERY_ALL_USERS from "../queries/users";

const DisplayData = () => {
  interface user {
    id: number;
    name: String;
    username: String;
    age: number;
    nationality: String;
  }

  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  if (data) {
    console.log(data);
  }
  if (loading) {
    return <p>Data is loading ...</p>;
  }
  if (error) {
    console.log(error);
  }

  return (
    <>
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
