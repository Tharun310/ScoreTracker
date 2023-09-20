import * as yup from "yup";

export const employeeloginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .test(
      "email-domain",
      "Enter your organization email",
      (value) => value && value.toLowerCase().endsWith("@jmangroup.com")
    )
    .required("*Required"),
  password: yup.string().required("*Required"),
});

export const employeeSignupSchema = yup.object().shape({
  fName: yup.string().required("*Required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .test(
      "email-domain",
      "Enter your organization email",
      (value) => value && value.toLowerCase().endsWith("@jmangroup.com")
    )
    .required("*Required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Min 6 char,At least 1 number,symbol,small case,large case"
    )
    .required("*Required"),
  cPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password do not match")
    .required("*Required"),
});
