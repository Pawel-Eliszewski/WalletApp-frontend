import * as React from "react";
import { useState } from "react";
import styles from "./RegisterForm.module.css";
import wallet from "../../assets/mini-wallet.svg";
import emailIcon from "../../assets/emailIcon.svg";
import lockIcon from "../../assets/lockIcon.svg";
import personIcon from "../../assets/personIcon.svg";
const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
  };
  return (
    <div className={styles.register}>
      <div className={styles.register__header}>
        <img src={wallet} alt="Wallet" />
        <h2>Wallet</h2>
      </div>
      <form className={styles.register__form} onSubmit={handleSubmit}>
        <label>
          <img src={emailIcon} alt="email" />
          <input
            type="email"
            value={email}
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <img src={lockIcon} alt="lock" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        <label>
          <img src={lockIcon} alt="lock" />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm password"
          />
        </label>
        <label>
          <img src={personIcon} alt="person" />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First name"
          />
        </label>
        <button className={styles.register__signup} type="submit">
          REGISTER
        </button>
        <button className={styles.register__signin}>LOG IN</button>
      </form>
    </div>
  );
};
export default RegistrationForm;
