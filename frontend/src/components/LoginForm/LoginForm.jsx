import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../redux/session/operations";
import validationSchema from "../../utils/yupValidationSchema";
import styles from "./LoginForm.module.css";
// import axios from "axios";

const LoginForm = () => {
  const dispatch = useDispatch;
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
      /*const response = await axios.post("/api/login", formData);*/
      const response = dispatch(login(formData));

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
        <img src="/assets/icon-wallet-small.svg" alt="Wallet" />
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
