import { namedOperations, useUnfollowMutation } from "../generated/graphql";

interface Props {
  id: number;
}

export default function UnfollowUser({ id }: Props) {
  const [deleteFollow] = useUnfollowMutation({
    refetchQueries: [namedOperations.Query.MyProfile],
  });

  const handleUnFollow = async () => {
    await deleteFollow({
      variables: { deleteFollowId: id },
    });
  };

  return (
    <div>
      <button onClick={handleUnFollow} className="edit-button">
        Unfollow
      </button>
    </div>
  );
}
