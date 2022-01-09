import React from "react";
import { namedOperations, useLikeTweetMutation } from "../generated/graphql";

interface Props {
  id?: number;
}

const LikeTweet = ({ id }: Props) => {
  const [likeTweetMutation, { data, loading, error }] = useLikeTweetMutation({
    refetchQueries: [
      namedOperations.Query.AllTweets,
      namedOperations.Query.MyProfile,
    ],
  });

  const handleCreateLike = async () => {
    await likeTweetMutation({
      variables: {
        likeTweetId: id,
      },
    });
  };
  return (
    <span
      onClick={handleCreateLike}
      style={{ marginRight: "5px", cursor: "pointer" }}
    >
      <i className="far fa-thumbs-up" aria-hidden="true" />
    </span>
  );
};

export default LikeTweet;
