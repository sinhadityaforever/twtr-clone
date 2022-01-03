import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import Modal from "react-modal";
import { customStyles } from "../styles/CustomModalStyles";
import {
  namedOperations,
  useCreateProfileMutation,
} from "../generated/graphql";

interface Props {}

const CreateProfile = (props: Props) => {
  const [createProfileMutation, { data, loading, error }] =
    useCreateProfileMutation({
      refetchQueries: [namedOperations.Query.MyProfile],
    });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const initialValues = {
    bio: "",
    location: "",
    website: "",
    avatar: "",
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Create Profile</button>
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

            await createProfileMutation({
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
              Create Profile
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default CreateProfile;
