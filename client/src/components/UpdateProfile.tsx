import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import Modal from "react-modal";
import { customStyles } from "../styles/CustomModalStyles";
import {
  namedOperations,
  useMyProfileQuery,
  useUpdateProfileMutation,
} from "../generated/graphql";

interface Props {}

const UpdateProfile = (props: Props) => {
  const { data, loading, error } = useMyProfileQuery();

  const [updateProfileMutation] = useUpdateProfileMutation({
    refetchQueries: [namedOperations.Query.MyProfile],
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  const initialValues = {
    updateProfileId: data?.me?.profile?.id,
    bio: data?.me?.profile?.bio,
    location: data?.me?.profile?.location,
    website: data?.me?.profile?.website,
    avatar: data?.me?.profile?.avatar,
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Update Profile</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="='Modal"
        style={customStyles}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={async (value, { setSubmitting }) => {
            setSubmitting(true);

            await updateProfileMutation({
              variables: value,
            });

            setSubmitting(false);
            setModalIsOpen(false);
          }}
        >
          <Form>
            <Field name="bio" type="text" as="textarea" placeholder="Bio" />
            <ErrorMessage name="bio" component={"div"} />

            <Field name="location" type="location" placeholder="location" />
            <ErrorMessage name="location" component={"div"} />
            <Field name="website" type="website" placeholder="website" />
            <ErrorMessage name="website" component={"div"} />

            <button type="submit" className="login-button">
              Update Profile
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default UpdateProfile;
