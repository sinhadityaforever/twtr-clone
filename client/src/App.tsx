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

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
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
        <Route path="/" element={<div>Test</div>}></Route>
        <Route path="signup" element={<Signup></Signup>} />
        <Route path="login" element={<Login></Login>} />
        <Route path="/landing" element={<Landing></Landing>} />

        <Route path="users" element={<Users></Users>} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;