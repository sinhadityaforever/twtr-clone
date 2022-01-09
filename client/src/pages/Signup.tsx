import * as React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useMeQuery, useSignupMutation } from "../generated/graphql";
import { Link, useNavigate } from "react-router-dom";
import TwitterLogo from "../assets/twitter-logo.png";
import "../styles/login.css";
import favicon from "../assets/twitter-logo.png";
interface ISignupProps {}

const Signup: React.FunctionComponent<ISignupProps> = (props) => {
  const navigate = useNavigate();
  const [signupMutation, { data, loading, error }] = useSignupMutation();
  const { data: meData, loading: meLoading, error: meError } = useMeQuery();
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

  if (meLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50vh",
        }}
      >
        <img
          src={favicon}
          style={{
            height: "10rem",
          }}
        ></img>
      </div>
    );
  }
  if (meData) {
    navigate("/");
  }

  return (
    <div className="container">
      <img
        src={TwitterLogo}
        alt="logo"
        style={{ width: "50px" }}
        className="logo"
      />
      <h3>Sign up</h3>
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
          <Field name="name" type="text" placeholder="Name" />
          <ErrorMessage name="name" component={"div"} />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component={"div"} />
          <Field
            name="Confirm password"
            type="password"
            placeholder="Confirm password"
          />
          <ErrorMessage name="Confirm password" component={"div"} />
          <button type="submit" className="login-button" color="#55ADEE">
            <span>Sign up</span>
          </button>
        </Form>
      </Formik>
      <div className="register">
        <h4>Already have an account?</h4>

        <Link to="/login">
          {" "}
          <button
            style={{ backgroundColor: "#228dcf" }}
            className="login-button"
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
