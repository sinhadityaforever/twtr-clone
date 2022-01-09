import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { customStyles } from "../styles/CustomModalStyles";
import "../styles/logout.css";
import { logoutModalStyles } from "../styles/LogoutModal";
import { useMyProfileQuery } from "../generated/graphql";
interface Props {}

const Logout = (props: Props) => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { data, loading, error } = useMyProfileQuery();
  if (loading) {
    return <p>Loading..</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <div className="logout">
        <span onClick={openModal} style={{ flex: 1, flexDirection: "row" }}>
          <h4>
            {data?.me?.profile?.avatar ? (
              <img
                src={data.me.profile.avatar}
                style={{ width: "40px", borderRadius: "50%" }}
                alt="avatar"
              />
            ) : (
              <i className="fa fa-user" aria-hidden="true"></i>
            )}
            <span style={{ marginLeft: "10px", marginBottom: "1rem" }}>
              {data?.me?.name}
            </span>
            <span style={{ marginLeft: "30px" }}>
              <i className="fas fa-ellipsis-h"></i>
            </span>
          </h4>
        </span>
        <div style={{ position: "absolute", bottom: 0 }}>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Modal"
            style={logoutModalStyles}
          >
            <span onClick={handleLogout} style={{ cursor: "pointer" }}>
              <p style={{ borderBottom: "1px solid black" }}>
                Log out @{data?.me?.name}
              </p>
            </span>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Logout;
