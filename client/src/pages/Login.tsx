import * as React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "../styles/login.css";
import { useLoginMutation } from "../generated/graphql";
import { Link, useNavigate } from "react-router-dom";
import TwitterLogo from "../assets/twitter-logo.png";
interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const navigate = useNavigate();
  const [LoginMutation, { data, loading, error }] = useLoginMutation();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Password Required"),
  });

  return (
    <div className="container">
      <img
        src={TwitterLogo}
        alt="logo"
        style={{ width: "50px" }}
        className="logo"
      />
      <h3>Log in to Fake Twitter</h3>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (value, { setSubmitting }) => {
          setSubmitting(true);

          const response = await LoginMutation({
            variables: value,
          });
          localStorage.setItem(
            "token",
            response.data?.login?.token as "string"
          );
          setSubmitting(false);
          navigate("/");
        }}
      >
        <Form>
          <Field name="email" type="text" placeholder="Email" />
          <ErrorMessage name="email" component={"div"} />

          <ErrorMessage name="name" component={"div"} />
          <Field name="password" type="password" placeholder="password" />
          <ErrorMessage name="password" component={"div"} />

          <button type="submit" className="login-button">
            Login
          </button>
        </Form>
      </Formik>
      <div className="register">
        <h4>Don't have an account?</h4>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
