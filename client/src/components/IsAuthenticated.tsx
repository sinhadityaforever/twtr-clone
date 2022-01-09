import React from "react";
import ContentLoader from "react-content-loader";
import { Navigate, useNavigate } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import favicon from "../assets/twitter-logo.png";
interface Props {
  children?: React.ReactNode;
}

const IsAuthenticated = ({ children }: Props) => {
  const navigate = useNavigate();
  const { data, loading, error } = useMeQuery();
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50vh",
        }}
      >
        <img
          src={favicon}
          style={{
            height: "10rem",
          }}
        ></img>
      </div>
    );
  }
  if (error) {
    navigate("/landing");
    return <p>{error.message}</p>;
  }
  if (!data?.me) {
    return <Navigate to={"/landing"}></Navigate>;
  }
  return <div>{children}</div>;
};

export default IsAuthenticated;
