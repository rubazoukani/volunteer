import React from "react";
import { Formik, Form as FForm, FormikHelpers } from "formik";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { useAppContext } from "../../context/AppProvider";
import InputField from "../../components/form/InputField";
import Button from "../../components/form/Button";
import greetBackgroundImage from "../../assets/greet-background.png";
import loginBackgroundImage from "../../assets/login-background.png";
import { resetForgottenPassword } from "../../api-client";
import { ResetForgottenPasswordForm } from "../../misc/types";
import { resetPasswordValidation } from "../../constants/formValidation";
import { resetForgottenPassword as initialValues } from "../../constants/formsValues";

const ResetForgottenPassword = (): React.JSX.Element => {
  const { showToast } = useAppContext();
  const navigateTo = useNavigate();

  const mutation = useMutation(resetForgottenPassword, {
    onSuccess: () => {
      showToast({ message: "Password reset successful", type: "SUCCESS" });
      navigateTo("/login");
    },
    onError: () => {
      showToast({ message: "Reset failed", type: "ERROR" });
    },
  });

  const onSubmit = async (
    { code, password }: ResetForgottenPasswordForm,
    formikHelpers: FormikHelpers<ResetForgottenPasswordForm>
  ) => {
    await mutation.mutateAsync({ code, password });
    formikHelpers.setSubmitting(false);
  };

  return (
    <main
      id="reset-forgotten-password"
      style={{ backgroundImage: `url(${loginBackgroundImage})` }}
      className="auth h-100vh flex-center-y position-relative"
    >
      <div className="content w-100 p-0 mx-sm-3 mx-2 flex-center overflow-hidden rounded-3">
        <div
          style={{ backgroundImage: `url(${greetBackgroundImage})` }}
          className="greeting h-100 flex-1 flex-center flex-column d-lg-flex d-none text-center"
        >
          <div className="mx-3 text-white">
            <h1 className="fw-semibold display-4 text-black">Reset Password</h1>
            <p className="m-0 fs-5 text-black">
              Enter your code and set a new password to access your account.
            </p>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordValidation}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <FForm className="bg-body form h-100 mx-auto px-md-5 px-2 flex-center text-black">
              <div>
                <h1 className="text-capitalize text-lg-start text-center fw-semibold text-black fs-3">
                  Set <span className="text-main">New Password</span>
                </h1>

                <p className="mb-4 text-black">Use the code sent to your email</p>

                <div className="d-flex flex-column gap-3">
                  <InputField
                    name="code"
                    label="Verification Code"
                    type="text"
                    placeholder="Enter code"
                    Icon={<FaLock />}
                    labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                    iconStyle="flex-center"
                  />
                  <InputField
                    name="password"
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                    Icon={<FaLock />}
                    labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                    iconStyle="flex-center"
                    autoComplete="off"
                  />
                  <InputField
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Repeat new password"
                    Icon={<FaLock />}
                    labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                    iconStyle="flex-center"
                    autoComplete="off"
                  />

                  <Button
                    type="submit"
                    variant="main-gradient"
                    className="w-100 mx-auto px-5 py-1 d-block rounded-3 fw-bold fs-6"
                    disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
                  >
                    {formik.isSubmitting ? "Resetting..." : "Reset Password"}
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

export default ResetForgottenPassword;
