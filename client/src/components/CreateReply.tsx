import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { customStyles } from "../styles/CustomModalStyles";
import Modal from "react-modal";
import * as Yup from "yup";
import "../styles/tweet.css";
import {
  namedOperations,
  useCreateReplyMutation,
  useMyProfileQuery,
} from "../generated/graphql";
import { log } from "console";
import { gql } from "@apollo/client";

interface Props {
  comment: string;
  commentId: number;
  name: string;
  avatar: string;
  id: number;
}

const singleTweetQuery = gql`
  query SingleTweet($tweetId: Int) {
    tweet(id: $tweetId) {
      id
      content
      author {
        id
        name
        profile {
          id
          avatar
        }
      }
      comments {
        id
        content
        createdAt
        User {
          id
          name
          profile {
            id
            avatar
          }
        }
      }
    }
  }
`;

const CreateReply = ({ comment, commentId, avatar, name, id }: Props) => {
  const [createReplyMutation, { data, loading, error }] =
    useCreateReplyMutation({
      refetchQueries: [
        {
          query: singleTweetQuery,
          variables: { tweetId: id },
        },
        namedOperations.Query.MyProfile,
      ],
    });

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
  const {
    data: meData,
    loading: meLoading,
    error: meError,
  } = useMyProfileQuery({
    variables: {},
  });
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div>
      <span onClick={openModal}>
        <i className="far fa-comment" aria-hidden="true" />
      </span>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={customStyles}
      >
        <span className="exit" onClick={closeModal}>
          <i className="fa fa-times" aria-hidden="true" />
        </span>
        <div className="header" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 8fr",
            marginTop: "10px",
          }}
        >
          <img
            src={avatar}
            style={{ width: "40px", borderRadius: "50%" }}
            alt="avatar"
          />
          <h5>{name}</h5>
        </div>
        <p
          style={{
            marginLeft: "20px",
            borderLeft: "1px solid var(--accent)",
            paddingLeft: "20px",
            height: "50px",
            marginTop: 0,
          }}
        >
          {comment}
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await createReplyMutation({
              variables: {
                content: values.content,
                commentId: commentId,
                createReplyId: id,
              },
            });

            setSubmitting(false);
            setModalIsOpen(false);
          }}
        >
          <Form>
            <img
              src={
                meData?.me?.profile?.avatar ? meData?.me?.profile?.avatar : ""
              }
              style={{ width: "40px", borderRadius: "50%" }}
              alt="avatar"
            />
            <Field
              name="content"
              type="text"
              as="textarea"
              placeholder="Tweet your reply..."
            />
            <ErrorMessage name="content" component={"div"} />

            <div className="footer" />
            <button type="submit" className="tweet-button">
              <span>Reply</span>
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default CreateReply;
