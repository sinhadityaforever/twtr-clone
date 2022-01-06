import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import Modal from "react-modal";
import ReactLoading from "react-loading";
import { customStyles } from "../styles/CustomModalStyles";
import {
  namedOperations,
  useMyProfileQuery,
  useUpdateProfileMutation,
} from "../generated/graphql";

interface Props {}

const UpdateProfile = (props: Props) => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const { data, loading, error } = useMyProfileQuery();

  const [updateProfileMutation, { loading: updateLoading }] =
    useUpdateProfileMutation({
      refetchQueries: [namedOperations.Query.MyProfile],
    });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files![0]);
    data.append("upload_preset", "darwin");
    setImageLoading(true);
    const res = await fetch(process.env.REACT_APP_CLOUDINARY_ENDPOINT!, {
      method: "POST",
      body: data,
    });
    const file = await res.json();

    setImage(file.secure_url);
    setImageLoading(false);
  };

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
      <button onClick={openModal} className="edit-button">
        Edit Profile
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="='Modal"
        style={customStyles}
      >
        <input
          type="file"
          name="file"
          placeholder="Upload an image"
          onChange={uploadImage}
          ref={inputFile}
          style={{ display: "none" }}
        />
        {imageLoading ? (
          <h3>Loading...</h3>
        ) : (
          <>
            {image ? (
              <span onClick={() => inputFile.current!.click()}>
                <img
                  src={image}
                  style={{ width: "150px", borderRadius: "50%" }}
                  alt="avatar"
                  onClick={() => inputFile.current!.click()}
                />
              </span>
            ) : (
              <span onClick={() => inputFile.current!.click()}>
                <i
                  className="fa fa-user fa-5x"
                  aria-hidden="true"
                  onClick={() => inputFile.current!.click()}
                ></i>
              </span>
            )}
          </>
        )}
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
            {updateLoading ? (
              <ReactLoading type="bubbles" color="#55ADEE"></ReactLoading>
            ) : (
              <button type="submit" className="login-button">
                Update Profile
              </button>
            )}
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default UpdateProfile;
