import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import DisplayUsers from "./components/DisplayUsers";
import DisplayMovies from "./components/DisplayMovies";
import "./App.css";

const App = () => {
  // Defining router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/users" index element={<DisplayUsers />} />
        <Route path="/movies" element={<DisplayMovies />} />
      </Route>
    )
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/",
  });

  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
};

const Root = () => {
  return <Navbar />;
};
export default App;
