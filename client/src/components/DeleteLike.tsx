import React from "react";
import {
  namedOperations,
  useDeleteLikeMutation,
  useLikeTweetMutation,
} from "../generated/graphql";

interface Props {
  id?: number;
}

const DeleteLike = ({ id }: Props) => {
  const [deleteLikeMutation, { data, loading, error }] = useDeleteLikeMutation({
    refetchQueries: [
      namedOperations.Query.AllTweets,
      namedOperations.Query.MyProfile,
    ],
  });

  const handleDeleteLike = async () => {
    await deleteLikeMutation({
      variables: {
        deleteLikeId: id,
      },
    });
  };
  return (
    <span onClick={handleDeleteLike} style={{ marginRight: "5px" }}>
      <i className="fas fa-thumbs-up" aria-hidden="true" />
    </span>
  );
};

export default DeleteLike;
