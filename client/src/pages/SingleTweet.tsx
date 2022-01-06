import { Link, useNavigate, useParams } from "react-router-dom";

import IsAuthenticated from "../components/IsAuthenticated";

import { useSingleTweetQuery } from "../generated/graphql";
import "../styles/home.css";
import "../styles/primary.css";
import LeftNav from "../components/LeftNav";

import PopularTweets from "../components/PopularTweets";
import CreateReply from "../components/CreateReply";
import ContentLoader from "react-content-loader";
interface Props {}

const SingleTweet = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useSingleTweetQuery({
    variables: {
      tweetId: parseInt(id as string),
    },
  });
  let body = <p>Loading</p>;

  body = (
    <>
      <div className="primary">
        <div className="left">
          <LeftNav />
        </div>
        {loading ? (
          <div>
            <ContentLoader />
            <ContentLoader />
            <ContentLoader />
          </div>
        ) : (
          <div className="home">
            <div className="home-header">
              <span className="back-arrow" onClick={() => navigate(-1)}>
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
              </span>
              <h3 className="home-title">Tweet</h3>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 8fr",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              <img
                src={
                  data?.tweet?.author?.profile?.avatar
                    ? data?.tweet?.author?.profile?.avatar
                    : ""
                }
                style={{ width: "40px", borderRadius: "50%" }}
                alt="avatar"
              />
              <h5>{data?.tweet?.author?.name}</h5>
            </div>
            <p
              style={{
                marginLeft: "20px",
                borderLeft: "1px solid var(--accent)",
                paddingLeft: "20px",
                height: "50px",
                marginTop: 0,
              }}
            >
              {data?.tweet?.content}
            </p>
            {data?.tweet?.comments?.map((comment) => (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 8fr",
                    marginTop: "10px",
                    marginLeft: "10px",
                  }}
                >
                  <img
                    src={
                      comment?.User?.profile?.avatar
                        ? comment?.User?.profile?.avatar
                        : ""
                    }
                    style={{ width: "40px", borderRadius: "50%" }}
                    alt="avatar"
                  />
                  <h5>{comment?.User?.name}</h5>
                </div>
                <p>{comment?.content}</p>
                <CreateReply
                  name={comment?.User?.name ? comment?.User?.name : ""}
                  avatar={
                    comment?.User?.profile?.avatar
                      ? comment?.User?.profile?.avatar
                      : ""
                  }
                  id={data?.tweet?.id ? data?.tweet?.id : 0}
                  comment={comment?.content ? comment?.content : ""}
                  commentId={comment?.id ? comment?.id : 0}
                />
              </>
            ))}
          </div>
        )}
        <div className="right">
          <PopularTweets />
        </div>
      </div>
    </>
  );

  return <IsAuthenticated>{body}</IsAuthenticated>;
};

export default SingleTweet;
