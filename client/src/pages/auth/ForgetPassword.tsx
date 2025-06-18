import React from "react";
import { Formik, Form as FForm, FormikHelpers } from "formik";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { useAppContext } from "../../context/AppProvider";
import InputField from "../../components/form/InputField";
import Button from "../../components/form/Button";
import greetBackgroundImage from "../../assets/greet-background.png";
import loginBackgroundImage from "../../assets/login-background.png";
import { forgotPassword } from "../../api-client";
import { ForgotPasswordForm } from "../../misc/types";
import { forgotPasswordValidation } from "../../constants/formValidation";
import { forgotPasswordForm as initialValues } from "../../constants/formsValues";

const ForgetPassword = (): React.JSX.Element => {
  const { showToast } = useAppContext();
  const navigateTo = useNavigate();

  const mutation = useMutation(forgotPassword, {
    onSuccess: () => {
      showToast({ message: "Reset link sent to your email", type: "SUCCESS" });
      navigateTo("/reset-forgotten-password");
    },
    onError: () => {
      showToast({ message: "Failed to send reset link", type: "ERROR" });
    },
  });

  const onSubmit = async (
    data: ForgotPasswordForm,
    formikHelpers: FormikHelpers<ForgotPasswordForm>
  ) => {
    await mutation.mutateAsync(data);
    formikHelpers.setSubmitting(false);
  };

  return (
    <main
      id="reset-password"
      style={{ backgroundImage: `url(${loginBackgroundImage})` }}
      className="auth h-100vh flex-center-y position-relative"
    >
      <div className="content w-100 p-0 mx-sm-3 mx-2 flex-center overflow-hidden rounded-3">
        <div
          style={{ backgroundImage: `url(${greetBackgroundImage})` }}
          className="greeting h-100 flex-1 flex-center flex-column d-lg-flex d-none text-center"
        >
          <div className="mx-3 text-white">
            <h1 className="fw-semibold display-4 text-black">Forgot Your Password?</h1>
            <p className="m-0 fs-5 text-black">We'll send you a link to reset it.</p>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={forgotPasswordValidation}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <FForm className="bg-body form h-100 mx-auto py-5 px-md-5 px-2 flex-center text-black">
              <div>
                <h1 className="text-capitalize text-lg-start text-center fw-semibold text-black fs-3">
                  Reset <span className="text-main">Password</span>
                </h1>

                <p className="mb-4 text-black">Enter your email to receive a reset link</p>

                <div className="d-flex flex-column gap-4">
                  <InputField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    Icon={<IoMdMail />}
                    labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                    iconStyle="flex-center"
                  />

                  <Button
                    type="submit"
                    variant="main-gradient"
                    className="w-100 mx-auto px-5 py-1 d-block rounded-3 fw-bold fs-6"
                    disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
                  >
                    {formik.isSubmitting ? "Sending..." : "Send Reset Link"}
                  </Button>
                </div>
              </div>
            </FForm>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default ForgetPassword;
