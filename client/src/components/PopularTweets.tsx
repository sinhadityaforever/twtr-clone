import { format } from "date-fns";
import React from "react";
import { usePopularTweetsQuery } from "../generated/graphql";
import "../styles/popularTweets.css";

interface Props {}

const PopularTweets = (props: Props) => {
  const { data, loading, error } = usePopularTweetsQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const getPopularTweets = data?.tweets
    ?.map((tweet) => tweet)
    .sort((a, b) => {
      return (b?.likes?.length as number) - (a?.likes?.length as number);
    })
    .slice(0, 6);
  return (
    <div className="popular-tweets">
      <h3 className="trending">Trending</h3>
      {getPopularTweets?.map((tweet) => (
        <div className="popular-tweet-container" key={tweet?.id}>
          <div className="date-title">
            <div className="title-logo">
              <img
                src={
                  tweet?.author?.profile?.avatar
                    ? tweet?.author?.profile?.avatar
                    : ""
                }
                style={{ width: "40px", borderRadius: "50%" }}
                alt="avatar"
              />
              <p className="tweet-content">{tweet?.content}</p>
            </div>
            <p className="date">
              {format(new Date(tweet?.createdAt), "MM/dd/yy")}
            </p>
          </div>
          <div className="tweet-likes">
            {(tweet?.likes?.length as number) > 0 ? (
              <span>Likes {tweet?.likes?.length}</span>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularTweets;
