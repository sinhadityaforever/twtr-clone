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
      <div>
        <img
          src={favicon}
          style={{
            height: "10rem",
            position: "fixed",
            top: "50%",
            left: "50%",
          }}
        ></img>
      </div>
    );
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
