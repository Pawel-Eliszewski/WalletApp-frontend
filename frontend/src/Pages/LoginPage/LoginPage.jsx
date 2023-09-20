import * as React from "react";
import { useState } from "react";
import LoginForm from "../../Components/LoginForm/LoginForm";
import styles from "./LoginPage.module.css";
import frametablet from "../../assets/tablet-frame.svg";
import framedesktop from "../../assets/desktop-frame.svg";

const LoginPage = () => {
  return (
    <div className={styles.login__container}>
      <div className={styles.login__tablet}>
        {window.innerWidth > 1200 ? (
          <img src={framedesktop} alt="framedesktop" />
        ) : (
          <img src={frametablet} alt="frametablet" />
        )}

        <h3>Finance App</h3>
        <div className={styles.firstelipse}></div>
        <div className={styles.secondelipse}></div>
      </div>
      <div className={styles.login__desktop}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
