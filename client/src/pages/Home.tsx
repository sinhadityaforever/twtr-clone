import { Link, useNavigate } from "react-router-dom";
import CreateProfile from "../components/CreateProfile";
import IsAuthenticated from "../components/IsAuthenticated";
import UpdateProfile from "../components/UpdateProfile";
import { useMyProfileQuery } from "../generated/graphql";
import "../styles/home.css";
import "../styles/primary.css";
import LeftNav from "../components/LeftNav";
import AllTweets from "../components/AllTweets";
interface Props {}

const Home = (props: Props) => {
  const navigate = useNavigate();
  const { loading, error, data } = useMyProfileQuery();
  let body = <p>Loading</p>;

  body = (
    <>
      <div className="primary">
        <div className="left">
          <LeftNav />
        </div>
        <div className="home">
          <div className="home-header">
            <h3 className="home-title">Home</h3>
          </div>
          {/* <HomPageTweet/> */}
          <AllTweets />
        </div>
        <div className="right">{/* <PopularTweets/> */}</div>
      </div>
    </>
  );

  return <IsAuthenticated>{body}</IsAuthenticated>;
};

export default Home;
