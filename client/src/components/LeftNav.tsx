import React from "react";
import { Link } from "react-router-dom";
import favicon from "../assets/twitter-logo.png";
import "../styles/leftNav.css";
import Logout from "./Logout";
import Tweet from "./Tweet";
interface Props {}

const LeftNav = (props: Props) => {
  return (
    <div
      style={{
        position: "fixed",
        overflow: "auto",
      }}
    >
      <Link to="/">
        <img src={favicon} alt="logo" style={{ width: "40px" }} />
      </Link>
      <Link to="/">
        <h2 style={{ textAlign: "start" }}>
          <i className="fa fa-home" aria-hidden="true" />{" "}
          <span className="title">Home</span>
        </h2>
      </Link>
      <Link to="/">
        <h2 style={{ textAlign: "start" }}>
          <i className="far fa-hashtag" aria-hidden="true" />{" "}
          <span className="title">Explore</span>
        </h2>
      </Link>
      <Link to="/">
        <h2 style={{ textAlign: "start" }}>
          <i className="far fa-bell" aria-hidden="true" />{" "}
          <span className="title">Notifications</span>
        </h2>
      </Link>
      <Link to="/">
        <h2 style={{ textAlign: "start" }}>
          <i className="far fa-envelope" aria-hidden="true" />{" "}
          <span className="title">Messages</span>
        </h2>
      </Link>
      <Link to="/">
        <h2 style={{ textAlign: "start" }}>
          <i className="far fa-bookmark" aria-hidden="true" />{" "}
          <span className="title">Bookmarks</span>
        </h2>
      </Link>
      <Link to="/">
        <h2 style={{ textAlign: "start" }}>
          <i className="far fa-clipboard-list" aria-hidden="true" />{" "}
          <span className="title">Lists</span>
        </h2>
      </Link>

      <Link to="/profile">
        <h2 style={{ textAlign: "start" }}>
          <i className="far fa-user" aria-hidden="true" />{" "}
          <span className="title">Profile</span>
        </h2>
      </Link>
      <Link to="/">
        <h2 style={{ textAlign: "start" }}>
          <i className="far fa-ellipsis-h" aria-hidden="true" />{" "}
          <span className="title">More</span>
        </h2>
      </Link>
      <Tweet />
      <Logout />
    </div>
  );
};

export default LeftNav;
