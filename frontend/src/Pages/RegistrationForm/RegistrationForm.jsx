import * as React from "react";
import { useState } from "react";
import styles from "./RegistrationForm.module.css";
import wallet from "../../../public/wallet.svg";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tutaj możesz dodać kod do przetwarzania danych rejestracji, na przykład wysłanie ich na serwer

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
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm password"
          />
        </label>
        <label>
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
        <button className={styles.register__signin}>LOGIN</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
