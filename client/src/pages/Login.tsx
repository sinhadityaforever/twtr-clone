import * as React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../generated/graphql";
import { useNavigate } from "react-router-dom";

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
    <div>
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

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
