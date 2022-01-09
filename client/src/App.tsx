import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { setContext } from "apollo-link-context";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import IsAuthenticated from "./components/IsAuthenticated";
import Landing from "./components/Landing";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import SingleTweet from "./pages/SingleTweet";
import SingleUser from "./pages/SingleUser";
import Error from "./pages/Error";

const httpLink = new HttpLink({
  uri: "https://twtrclone.herokuapp.com/",
});
const authLink = setContext(async (req, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = authLink.concat(httpLink as any);
const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="signup" element={<Signup></Signup>} />
        <Route path="login" element={<Login></Login>} />
        <Route path="/tweet/:id" element={<SingleTweet></SingleTweet>} />
        <Route path="/user/:id" element={<SingleUser></SingleUser>} />
        <Route path="/landing" element={<Landing></Landing>} />
        <Route path="/profile" element={<Profile></Profile>} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
