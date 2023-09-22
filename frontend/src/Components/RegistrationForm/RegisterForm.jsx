import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

import validationSchema from "../../Utils/yupValidationSchema";
import styles from "./RegisterForm.module.css";
import wallet from "../../assets/mini-wallet.svg";
import emailIcon from "../../assets/emailIcon.svg";
import lockIcon from "../../assets/lockIcon.svg";
import personIcon from "../../assets/personIcon.svg";

const RegistrationForm = () => {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formData = {
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      firstName: values.firstName,
    };

    try {
      const response = await axios.post("/api/register", formData);

      if (response.status === 200) {
        alert("Registration Success");
        resetForm();
      } else {
        alert("Registration error");
      }
    } catch (error) {
      alert("An error occurred while processing the request.");
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.register__header}>
        <img src={wallet} alt="Wallet" />
        <h2>Wallet</h2>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={styles.register__form}>
            <div className={styles.field}>
              <img src={emailIcon} alt="email" />
              <Field
                className={styles.register__field}
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
              <img src={lockIcon} alt="lock" />
              <Field
                className={styles.register__field}
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
            <div className={styles.field}>
              <img src={lockIcon} alt="lock" />
              <Field
                className={styles.register__field}
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.field}>
              <img src={personIcon} alt="person" />
              <Field
                className={styles.register__field}
                type="text"
                name="firstName"
                placeholder="First name"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className={styles.error}
              />
            </div>
            <button className={styles.register__signup} type="submit">
              REGISTER
            </button>
            {/*<Link to="./LoginPage">*/}
            <button className={styles.register__signin}>LOG IN</button>
            {/* </Link>*/}
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default RegistrationForm;
