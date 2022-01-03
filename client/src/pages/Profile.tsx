import { useQuery } from "@apollo/client";
import React from "react";
import CreateProfile from "../components/CreateProfile";
import IsAuthenticated from "../components/IsAuthenticated";
import UpdateProfile from "../components/UpdateProfile";
import { useMyProfileQuery } from "../generated/graphql";

interface Props {}

const Profile = (props: Props) => {
  const { loading, error, data } = useMyProfileQuery();
  let body = <p>Loading</p>;
  if (loading) {
    body = <p>Loading</p>;
  } else if (error) {
    body = <p>{error.message}</p>;
  } else {
    body = (
      <div className="container">
        <h1>Profile</h1>
        {data?.me?.profile?.id ? (
          <div>
            <UpdateProfile></UpdateProfile>
            <p>{data?.me?.profile?.bio}</p>
            <p>{data?.me?.profile?.location}</p>
            <p>{data?.me?.profile?.website}</p>
          </div>
        ) : (
          <CreateProfile></CreateProfile>
        )}
      </div>
    );
  }

  return <IsAuthenticated>{body}</IsAuthenticated>;
};

export default Profile;
