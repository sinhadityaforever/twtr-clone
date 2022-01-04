import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { customStyles } from "../styles/CustomModalStyles";
import Modal from "react-modal";
import * as Yup from "yup";
import "../styles/tweet.css";
import { namedOperations, useCreateTweetMutation } from "../generated/graphql";
const HomePageTweet = () => {
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

  return (
    <div className="home-page-tweet">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={async (value, { setSubmitting }) => {
          setSubmitting(true);

          await createTweetMutation({
            variables: value,
            refetchQueries: [namedOperations.Query.AllTweets],
          });

          setSubmitting(false);
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

          <button type="submit" className="home-tweet-button">
            <span>Tweet</span>
          </button>
        </Form>
      </Formik>
      <div className="footer"></div>
    </div>
  );
};

export default HomePageTweet;
