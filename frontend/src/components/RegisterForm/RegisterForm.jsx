import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "../../utils/yupValidationSchema";
import { register } from "../../redux/session/operations";
import styles from "./RegisterForm.module.css";
// import axios from "axios";

const RegisterForm = () => {
  const dispatch = useDispatch;
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
      /*const response = await axios.post("/api/register", formData);*/
      const response = dispatch(register(formData));

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
        <img src="/assets/icon-miniwallet.svg" alt="Wallet" />
        <h2 className={styles.h2}>Wallet</h2>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={styles.register__form}>
            <div className={styles.field}>
              <img
                className={styles.email}
                src="/assets/icon-email.svg"
                alt="email"
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
                alt="lock"
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
              <div className={styles.meter}>
                <div className={styles.meter__element}></div>
              </div>
            </div>
            <div className={styles.field}>
              <img
                className={styles.fieldimg}
                src="/assets/icon-person.svg"
                alt="person"
              />
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
            <Link to="./login">
              <button className={styles.register__signin}>LOG IN</button>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default RegisterForm;
