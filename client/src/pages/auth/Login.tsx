import React from "react";
import { Form as FForm, Formik, FormikHelpers } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Login as LoginType } from "../../misc/types";
import { login } from "../../api-client";
import { useAppContext } from "../../context/AppProvider";
import InputField from "../../components/form/InputField";
import { loginForm as initialValues } from "../../constants/formsValues";
import { loginForm as loginValidation } from "../../constants/formValidation";
import Button from "../../components/form/Button";
import greetBackgroundImage from "../../assets/greet-background.png"
import loginBackgroundImage from "../../assets/login-background.png"

const Login = (): React.JSX.Element => {
  const { showToast } = useAppContext();
  const navigateTo = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(login, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "User logged in successfully", type: "SUCCESS" });
      navigateTo("/profile");
    },
    onError: () => {
      showToast({ message: "Logging in failed", type: "ERROR" });
    },
  });

  const onSubmit = async (
    data: LoginType,
    formikHelpers: FormikHelpers<LoginType>
  ) => {
    await mutation.mutateAsync(data);
    formikHelpers.setSubmitting(false);
  };

  return (
    <main id="login"
      style={{ backgroundImage: `url(${loginBackgroundImage})` }}
      className="auth h-100vh flex-center-y position-relative">
      <div className="content w-100 p-0 mx-sm-3 mx-2 flex-center overflow-hidden rounded-3">
        <div
          style={{ backgroundImage: `url(${greetBackgroundImage})` }}
          className="greeting h-100 flex-1 flex-center flex-column d-lg-flex d-none text-center">
          <div className="mx-3 text-white">
            <h1 className="fw-semibold display-4 text-black">Welcome to Volunteer</h1>
            <p className="m-0 fs-5 text-black">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
              officia sint voluptates temporibus reiciendis atque?
            </p>
          </div>
        </div>

        <Formik
          validationSchema={loginValidation}
          initialValues={initialValues}
          onSubmit={onSubmit}>
          {(formik) => (
            <FForm className="bg-body form h-100 mx-auto py-5 px-md-5 px-2 flex-center text-black overflow-hidden">
              <div>
                <h1 className="text-capitalize text-lg-start text-center fw-semibold text-black fs-3">
                  Hello! <span className="text-main">Good Morning</span>
                </h1>

                <p className="mb-4 text-capitalize text-black">
                  Login your account
                </p>

                <div className="d-flex flex-column gap-3">
                  <InputField
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    styles="text-black"
                    labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                    iconStyle="flex-center"
                    Icon={<IoMdMail />}
                  />

                  <InputField
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    styles="text-black"
                    labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                    iconStyle="flex-center"
                    Icon={<FaLock />}
                    autoComplete="off"
                  />

                  <div>
                    <Button
                      type="submit"
                      variant="main-gradient"
                      className="w-100 mx-auto px-5 py-1 d-block rounded-3 fw-bold fs-6"
                      disabled={
                        !formik.isValid || formik.isSubmitting || !formik.dirty
                      }
                    >
                      {formik.isSubmitting ? "Wait..." : "Login"}
                    </Button>

                    <Link to="/forgot-password" className="link d-block">Forget password?</Link>
                  </div>


                  <div className="fs-sm">
                    <p className="m-0 fs-sm text-black">Don't have an account yet?</p>
                    <Link className="link d-block" to="/register/volunteer">Create account as volunteer</Link>
                    <Link className="link d-block" to="/register/organization">Create account as organization</Link>
                  </div>
                </div>
              </div>
            </FForm>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default Login;
