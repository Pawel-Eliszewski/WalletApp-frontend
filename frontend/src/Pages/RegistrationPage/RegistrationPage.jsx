//RegForm
import * as React from "react";
import { useState } from "react";
import RegistrationForm from "../../Components/RegisterForm/RegisterForm";
import styles from "./RegistrationPage.module.css";
import frametablet from "../../assets/tablet-frame.svg";
import framedesktop from "../../assets/desktop-frame.svg";

const RegistrationPage = () => {
  return (
    <div className={styles.register__container}>
      <div className={styles.register__tablet}>
        {window.innerWidth > 1200 ? (
          <img src={framedesktop} alt="framedesktop" />
        ) : (
          <img src={frametablet} alt="frametablet" />
        )}

        <h3>Finance App</h3>
        <div className={styles.firstelipse}></div>
        <div className={styles.secondelipse}></div>
      </div>
      <div className={styles.register__desktop}>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegistrationPage;
