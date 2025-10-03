import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(3, "First name should be at least 3 characters")
    .max(16, "First name should be at most 16 characters"),

  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name should be at least 2 characters")
    .max(16, "Last name should be at most 16 characters"),

  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters"),

  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters"),
});
