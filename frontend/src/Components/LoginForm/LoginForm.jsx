import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "../../Utils/yupValidationSchema";
import styles from "./LoginForm.module.css";
import wallet from "../../assets/mini-wallet.svg";
import emailIcon from "../../assets/emailIcon.svg";
import lockIcon from "../../assets/lockIcon.svg";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = (values, { resetForm }) => {
    // Obsługa wysłania formularza, można dodać tutaj logikę uwierzytelniania

    // Po zakończeniu przetwarzania zresetuj formularz
    resetForm(initialValues);
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__header}>
        <img src={wallet} alt="Wallet" />
        <h2>Wallet</h2>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={styles.login__form}>
            <div className={styles.field}>
              <img src={emailIcon} alt="email" />
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
              <img src={lockIcon} alt="lock" />
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
            <button className={styles.login__signin} type="submit">
              LOG IN
            </button>
            <Link to="./RegistrationPage">
              <button className={styles.login__signup}>REGISTER</button>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
