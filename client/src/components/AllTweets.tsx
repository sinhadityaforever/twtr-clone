import { subDays, formatDistance } from "date-fns";

import React from "react";
import { Link } from "react-router-dom";
import { useAllTweetsQuery, useMyProfileQuery } from "../generated/graphql";
import "../styles/allTweets.css";
import CreateComment from "./CreateComment";
import DeleteLike from "./DeleteLike";
import LikeTweet from "./LikeTweet";
interface Props {}

const AllTweets = (props: Props) => {
  const { data, loading, error } = useAllTweetsQuery();
  const {
    data: meData,
    loading: meLoading,
    error: meError,
  } = useMyProfileQuery();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (meLoading) {
    return <p>Loading...</p>;
  }
  if (meError) {
    return <p>{meError.message}</p>;
  }
  // interface AllTweets {
  //   content: string?;
  //   createdAt: Date?;
  //   author: {
  //     name: string?;
  //     Profile: {
  //       avatar: string;
  //     };
  //   };
  // }

  return (
    <div>
      {data?.tweets?.map((tweet) => (
        <div className="tweet-container">
          <Link to={`/tweet/${tweet?.id}`}>
            <div className="tweet-header">
              <img
                src={
                  tweet?.author?.profile?.avatar
                    ? tweet?.author?.profile?.avatar
                    : ""
                }
                style={{ width: "40px", borderRadius: "50%" }}
                alt="avatar"
              />
              <Link to={`/user/${tweet?.author?.id}`}>
                <h4 className="name">{tweet?.author?.name} </h4>
              </Link>
              <p className="date-time">
                {formatDistance(
                  subDays(new Date(tweet?.createdAt), 0),
                  new Date()
                )}{" "}
                ago
              </p>
            </div>
            <p>{tweet?.content}</p>
          </Link>
          <div className="likes">
            {meData?.me?.likedTweets
              ?.map((t) => t?.tweet?.id)
              .includes(tweet?.id) ? (
              <span>
                <DeleteLike
                  id={
                    meData?.me?.likedTweets.filter(
                      (like) => like?.tweet?.id === tweet?.id
                    )[0]?.id
                  }
                />

                {tweet?.likes === null ? 0 : tweet?.likes?.length}
              </span>
            ) : (
              <span>
                <LikeTweet id={tweet?.id} />
                {tweet?.likes === null ? 0 : tweet?.likes?.length}
              </span>
            )}
            <span style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <CreateComment
                avatar={
                  tweet?.author?.profile?.avatar
                    ? tweet?.author?.profile?.avatar
                    : ""
                }
                name={tweet?.author?.name ? tweet.author.name : ""}
                tweet={tweet?.content ? tweet?.content : ""}
                id={tweet?.id ? tweet?.id : 0}
              />
              {(tweet?.comments?.length as number) > 0
                ? tweet?.comments?.length
                : null}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllTweets;
