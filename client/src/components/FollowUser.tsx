import React from "react";
import { namedOperations, useFollowMutation } from "../generated/graphql";

interface Props {
  id: number;
  name: string;
  avatar: string;
}

export const FollowUser = ({ id, name, avatar }: Props) => {
  const [followMutation, { data, loading, error }] = useFollowMutation({
    refetchQueries: [namedOperations.Query.MyProfile],
  });

  const handleFollow = async () => {
    await followMutation({
      variables: {
        followId: id,
        name,
        avatar,
      },
    });
  };

  return (
    <div>
      <button onClick={handleFollow} className="edit-button">
        Follow
      </button>
    </div>
  );
};
