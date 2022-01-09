import React, { ReactElement, useState } from "react";
import pen from "../assets/pen.png";
import { namedOperations, useCreateTweetMutation } from "../generated/graphql";
import "../styles/homepen.css";
import * as Yup from "yup";
import Modal from "react-modal";
import ReactLoading from "react-loading";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { customStyles } from "../styles/CustomModalStyles";
interface Props {}

function HomePen({}: Props): ReactElement {
  const [createTweetMutation, { data, loading, error }] =
    useCreateTweetMutation();
  const initialValues = {
    content: "",
  };

  const validationSchema = Yup.object({
    content: Yup.string()
      .required()
      .min(1, "Must be more than 1 character")
      .max(256, "Must be less than 257 characters"),
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div>
      <img className="home-pen" src={pen} onClick={openModal}></img>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="='Modal"
        style={customStyles}
      >
        <span className="exit" onClick={closeModal}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </span>
        <div className="header"></div>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={async (value, { setSubmitting }) => {
            setSubmitting(true);

            await createTweetMutation({
              variables: value,
              refetchQueries: [namedOperations.Query.MyProfile],
            });

            setSubmitting(false);
            setModalIsOpen(false);
          }}
        >
          <Form>
            <Field
              name="content"
              type="text"
              as="textarea"
              placeholder="What's happening?"
            />
            <ErrorMessage name="content" component={"div"} />
            <div className="footer"></div>
            {loading ? (
              <ReactLoading type="bubbles" color="#55ADEE"></ReactLoading>
            ) : (
              <button type="submit" className="tweet-button">
                {" "}
                <span>Tweet</span>
              </button>
            )}
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}

export default HomePen;
