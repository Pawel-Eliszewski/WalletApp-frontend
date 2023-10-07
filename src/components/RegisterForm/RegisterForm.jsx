import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerValidationSchema } from "../../utils/yupValidationSchema";
import { register } from "../../redux/session/operations";
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values) => {
    const formData = {
      email: values.email,
      password: values.password,
    };
    dispatch(register(formData));
  };

  return (
    <div className={styles.register}>
      <div className={styles.register__header}>
        <img src="/assets/icon-wallet-small.svg" alt="Wallet" />
        <h2 className={styles.h2}>Wallet</h2>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={styles.register__form}>
            <div className={styles.field}>
              <img
                className={styles.email}
                src="/assets/icon-email.svg"
                alt="email icon"
              />
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
              <img
                className={styles.fieldimg}
                src="/assets/icon-lock.svg"
                alt="lock icon"
              />
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
              <img
                className={styles.fieldimg}
                src="/assets/icon-lock.svg"
                alt="lock"
              />
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
            <button className={styles.register__signup} type="submit">
              REGISTER
            </button>
            <Link to="/login">
              <button className={styles.register__signin}>LOG IN</button>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default RegisterForm;
