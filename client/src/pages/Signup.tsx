import * as React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSignupMutation } from "../generated/graphql";
import { useNavigate } from "react-router-dom";

interface ISignupProps {}

const Signup: React.FunctionComponent<ISignupProps> = (props) => {
  const navigate = useNavigate();
  const [signupMutation, { data, loading, error }] = useSignupMutation();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Password Required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Name Required"),
  });

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (value, { setSubmitting }) => {
          setSubmitting(true);

          const response = await signupMutation({
            variables: value,
          });
          localStorage.setItem(
            "token",
            response.data?.signup?.token as "string"
          );
          setSubmitting(false);
          navigate("/");
        }}
      >
        <Form>
          <Field name="email" type="text" placeholder="Email" />
          <ErrorMessage name="email" component={"div"} />
          <Field name="name" type="text" placeholder="name" />
          <ErrorMessage name="name" component={"div"} />
          <Field name="password" type="password" placeholder="password" />
          <ErrorMessage name="password" component={"div"} />
          <Field
            name="Confirm password"
            type="password"
            placeholder="Confirm password"
          />
          <ErrorMessage name="Confirm password" component={"div"} />
          <button type="submit">Signup</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
