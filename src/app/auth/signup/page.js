"use client";

import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";

import GoogleAuthButton from "@/components/GoogleAuthButton";
import { signUp } from "@/actions/auth";
import { signUpSchema } from "@/lib/validation";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className="bg-background-secondary">
      <div className="container h-[100vh] mx-auto flex flex-col justify-center items-center">
        <div className="bg-background rounded-md shadow-md w-full md:w-[500px] flex flex-col items-center gap-4 p-4 relative overflow-hidden">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-center">Create account</h1>
          </div>

          {/* Google Auth Button */}
          <GoogleAuthButton />

          {/* Divider */}
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signUpSchema}
            onSubmit={async (values, { setErrors, setStatus }) => {
              setStatus(null); // reset error

              const formData = new FormData();
              Object.entries(values).forEach(([key, value]) =>
                formData.append(key, value)
              );

              const result = await signUp(formData);

              if (result.success) {
                router.push("/dashboard");
                router.refresh();
              } else {
                if (`${result.error}`.startsWith("This email")) {
                  setErrors({ email: result.error });
                } else {
                  setStatus(result.error);
                }
              }
            }}
          >
            {({ isSubmitting, status }) => (
              <Form className="w-full flex flex-col gap-4">
                {status && (
                  <div className="text-red-500 text-sm text-center">
                    {status}
                  </div>
                )}

                {isSubmitting && (
                  <div className="absolute top-0 left-0 w-full h-full bg-[#1286d924] cursor-wait" />
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Field
                      name="firstName"
                      placeholder="First Name"
                      className="input"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <Field
                      name="lastName"
                      placeholder="Last Name"
                      className="input"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="input"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="input"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Create Account
                </button>
              </Form>
            )}
          </Formik>

          {/* Sign In link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                className="text-primary hover:underline focus:outline-none cursor-pointer"
                href="/auth/signin"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
