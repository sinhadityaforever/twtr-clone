import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

interface Props {
  children?: React.ReactNode;
}

const IsAuthenticated = ({ children }: Props) => {
  const navigate = useNavigate();
  const { data, loading, error } = useMeQuery();
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (!data?.me) {
    return <Navigate to={"/landing"}></Navigate>;
  }
  return <div>{children}</div>;
};

export default IsAuthenticated;
