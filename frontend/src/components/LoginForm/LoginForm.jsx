import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "../../Utils/yupValidationSchema";
import styles from "./LoginForm.module.css";
import axios from "axios";
//
import GogLogin from "../GoogleLogin/GoogleLogin";
import GogLogout from "../../GoogleLogout/GoogleLogout";
import { gapi } from "gapi-script";
const clientId =
  "609849944733-kcufeaglgkhndbv7vlkhsr244pt313tt.apps.googleusercontent.com";

const LoginForm = () => {
  //googleauth
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = async (values, { resetForm }) => {
    const formData = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await axios.post(
        "https://wallet-app-18x3.onrender.com/api/login",
        formData
      );

      if (response.status === 200) {
        alert("Login Success");
        resetForm();
      } else {
        alert("Login error");
      }
    } catch (error) {
      alert("An error occurred while processing the request.");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__header}>
        <img src="/assets/icon-miniwallet.svg" alt="Wallet" />
        <h2 className={styles.h2}>Wallet</h2>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={styles.login__form}>
            <div className={styles.field}>
              <img
                className={styles.email}
                src="/assets/icon-email.svg"
                alt="email"
              />
              <Field
                className={styles.login__field}
                type="email"
                name="email"
                placeholder="E-mail"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.field}>
              <img
                className={styles.fieldimg}
                src="assets/icon-lock.svg"
                alt="lock"
              />
              <Field
                className={styles.login__field}
                type="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </div>
            <GogLogin />
            <GogLogout />
            <button className={styles.login__signin} type="submit">
              LOG IN
            </button>
            <Link to="/register">
              <button className={styles.login__signup}>REGISTER</button>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
