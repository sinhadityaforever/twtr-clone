import { Link, useNavigate, useParams } from "react-router-dom";
import CreateProfile from "../components/CreateProfile";
import IsAuthenticated from "../components/IsAuthenticated";
import UpdateProfile from "../components/UpdateProfile";
import { useMyProfileQuery, useSingleUserQuery } from "../generated/graphql";
import "../styles/profile.css";
import "../styles/primary.css";
import LeftNav from "../components/LeftNav";
import PopularTweets from "../components/PopularTweets";
import { FollowUser } from "../components/FollowUser";
import UnfollowUser from "../components/UnfollowUser";
import ContentLoader from "react-content-loader";
interface Props {}

const SingleUser = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useSingleUserQuery({
    variables: {
      singleUserId: parseInt(id as string),
    },
  });
  const {
    data: meData,
    loading: meLoading,
    error: meError,
  } = useMyProfileQuery();

  let body = <p>Loading</p>;

  if (error || meError) {
    body = <p>{error?.message || meError?.message}</p>;
  } else {
    const idOfFollowers = meData?.me?.Following?.map(
      (follow) => follow?.followId
    );
    const follows = meData?.me?.Following?.map((follow) => follow);

    const getFollowId = follows?.filter(
      (follow: any) => follow.followId === data?.singleUser?.id
    );
    body = (
      <>
        <div className="primary">
          <div className="left">
            <LeftNav />
          </div>
          {loading || meLoading ? (
            <div>
              <ContentLoader />
              <ContentLoader />
              <ContentLoader />
            </div>
          ) : (
            <div className="profile">
              <div className="profile-info">
                <div className="profile-head">
                  <span className="back-arrow" onClick={() => navigate(-1)}>
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                  </span>
                  <span className="nickname">
                    <h3>{data?.singleUser?.name}</h3>
                  </span>
                </div>
                <div className="avatar">
                  {data?.singleUser?.profile?.avatar ? (
                    <img
                      src={data?.singleUser?.profile?.avatar}
                      style={{ width: "150px", borderRadius: "50%" }}
                      alt="avatar"
                    />
                  ) : (
                    <i className="fa fa-user fa-5x" aria-hidden="true"></i>
                  )}
                </div>
                <div className="make-profile">
                  {idOfFollowers?.includes(data?.singleUser?.id) ? (
                    //@ts-ignore
                    <UnfollowUser id={getFollowId[0]?.id as number} />
                  ) : (
                    <FollowUser
                      id={data?.singleUser?.id || 0}
                      name={data?.singleUser?.name || ""}
                      avatar={data?.singleUser?.profile?.avatar || ""}
                    />
                  )}
                </div>

                <h3 className="name">{data?.singleUser?.name}</h3>

                {data?.singleUser?.profile ? (
                  <p>
                    <i className="fas fa-link"> </i>{" "}
                    <Link
                      to={{
                        pathname: `http://${data?.singleUser?.profile.website}`,
                      }}
                      target="_blank"
                    >
                      {data?.singleUser.profile.website}
                    </Link>
                  </p>
                ) : null}
                <div className="followers">
                  <p>200 following</p>
                  <p>384 followers</p>
                </div>
              </div>
            </div>
          )}
          <div className="right">
            <PopularTweets />
          </div>
        </div>
      </>
    );
  }

  return <IsAuthenticated>{body}</IsAuthenticated>;
};

export default SingleUser;
