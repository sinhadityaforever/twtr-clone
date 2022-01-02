import React from "react";
import IsAuthenticated from "../components/IsAuthenticated";

interface Props {}

const Users = (props: Props) => {
  return (
    <IsAuthenticated>
      <div>This is users route</div>
    </IsAuthenticated>
  );
};

export default Users;
