import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy format adresu email")
    .required("Pole jest wymagane"),
  password: Yup.string()
    .min(6, "Hasło musi zawierać co najmniej 6 znaków")
    .max(12, "Hasło musi zawierać maksymalnie 12 znaków")
    .required("Pole jest wymagane"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Hasła muszą być identyczne")
    .required("Pole jest wymagane"),
  firstName: Yup.string().required("Pole jest wymagane"),
});
export default validationSchema;
