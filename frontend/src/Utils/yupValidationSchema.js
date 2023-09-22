import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("The field is required"),
  password: Yup.string()
    .min(6, "The password must contain at least 6 characters")
    .max(12, "The password must contain a maximum of 12 characters")
    .required("The field is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must be identical")
    .required("The field is required"),
  firstName: Yup.string().required("The field is required"),
});
export default validationSchema;
