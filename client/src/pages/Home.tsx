import { Link, useNavigate } from "react-router-dom";
import CreateProfile from "../components/CreateProfile";
import IsAuthenticated from "../components/IsAuthenticated";
import UpdateProfile from "../components/UpdateProfile";
import { useMyProfileQuery } from "../generated/graphql";
import "../styles/home.css";
import "../styles/primary.css";
import LeftNav from "../components/LeftNav";
import AllTweets from "../components/AllTweets";
import HomePageTweet from "../components/HomePageTweet";
import PopularTweets from "../components/PopularTweets";
import Footer from "../components/Footer";
import HomePen from "../components/HomePen";
import { slide as Menu } from "react-burger-menu";
import { useState } from "react";
import "../styles/burgerMenu.css";
interface Props {}

const Home = (props: Props) => {
  const navigate = useNavigate();
  const { loading, error, data } = useMyProfileQuery();
  let body = <p>Loading</p>;
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => {
    console.log("pressed");

    setIsOpen(true);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  body = (
    <>
      {isOpen && (
        <Menu isOpen={isOpen} onClose={closeMenu}>
          <div className="accountInfo">
            <p style={{ fontSize: "1.5rem" }}>Account Info</p>
          </div>
          <div style={{ display: "flex" }}>
            <img
              style={{
                maxWidth: "3rem",
                borderRadius: "50%",
                marginLeft: "1rem",
              }}
              src={
                data?.me?.profile?.avatar
                  ? data?.me?.profile?.avatar
                  : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
              }
            ></img>
          </div>
          <div>
            <p
              style={{
                fontWeight: "600",
                marginLeft: "1rem",
              }}
            >
              {data?.me?.name}
            </p>
          </div>
          <Link to="/profile">
            <h2 style={{ textAlign: "start" }}>
              <i className="far fa-user" aria-hidden="true" />{" "}
              <span className="title">Profile</span>
            </h2>
          </Link>
          <Link to="/">
            <h2 style={{ textAlign: "start" }}>
              <i className="far fa-clipboard-list" aria-hidden="true" />{" "}
              <span className="title">Lists</span>
            </h2>
          </Link>

          <Link to="/">
            <h2 style={{ textAlign: "start" }}>
              <i className="far fa-map-marker-alt" aria-hidden="true" />{" "}
              <span className="title">Topics</span>
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
              <i className="far fa-bolt" aria-hidden="true" />{" "}
              <span className="title">Moments</span>
            </h2>
          </Link>
          <Link to="/">
            <h2 style={{ textAlign: "start" }}>
              <i className="far fa-newspaper" aria-hidden="true" />{" "}
              <span className="title">Newsletters</span>
            </h2>
          </Link>
          <Link to="/">
            <h2 style={{ textAlign: "start" }}>
              <i className="far fa-rocket" aria-hidden="true" />{" "}
              <span className="title">Professional</span>
            </h2>
          </Link>
          <Link to="/">
            <h2 style={{ textAlign: "start" }}>
              <i className="far fa-external-link" aria-hidden="true" />{" "}
              <span className="title">Twitter Ads</span>
            </h2>
          </Link>
          <Link to="/">
            <h2 style={{ textAlign: "start" }}>
              <i className="far fa-analytics" aria-hidden="true" />{" "}
              <span className="title">Analytics</span>
            </h2>
          </Link>
          <Link to="/">
            <h2 style={{ textAlign: "start" }}>
              <i className="far fa-cog" aria-hidden="true" />{" "}
              <span className="title">Settings</span>
            </h2>
          </Link>
          <Link to="/">
            <h2 style={{ textAlign: "start" }}>
              <i className="far fa-question-circle" aria-hidden="true" />{" "}
              <span className="title">Help Center</span>
            </h2>
          </Link>
          <Link to="/" onClick={handleLogout}>
            <h2 style={{ textAlign: "start" }}>
              <i className="far fa-power-off" aria-hidden="true" />{" "}
              <span className="title">Logout</span>
            </h2>
          </Link>
        </Menu>
      )}

      <div className="primary">
        <div className="left">
          <LeftNav />
        </div>
        <div className="home">
          <div className="home-header">
            <img
              className="home-avatar"
              onClick={openMenu}
              src={
                data?.me?.profile?.avatar
                  ? data?.me?.profile?.avatar
                  : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
              }
            ></img>
            <h3 className="home-title">Home</h3>
          </div>
          <HomePageTweet />
          <AllTweets />
        </div>
        <div className="right">
          <PopularTweets />
        </div>
      </div>
      <HomePen></HomePen>
      <Footer></Footer>
    </>
  );

  return <IsAuthenticated>{body}</IsAuthenticated>;
};

export default Home;
