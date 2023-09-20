import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import wallet from "../../assets/mini-wallet.svg";
import emailIcon from "../../assets/emailIcon.svg";
import lockIcon from "../../assets/lockIcon.svg";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__header}>
        <img src={wallet} alt="Wallet" />
        <h2>Wallet</h2>
      </div>
      <form className={styles.login__form} onSubmit={handleSubmit}>
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
        <button className={styles.login__signin} type="submit">
          LOG IN
        </button>
        <button className={styles.login__signup} type="submit">
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
