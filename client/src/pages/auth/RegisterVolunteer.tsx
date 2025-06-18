import React from "react";
import { Form as FForm, Formik, FormikHelpers } from "formik";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaLock } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useAppContext } from "../../context/AppProvider";
import InputField from "../../components/form/InputField";
import Button from "../../components/form/Button";
import greetBackgroundImage from "../../assets/greet-background.png";
import loginBackgroundImage from "../../assets/login-background.png";
import { registerVolunteerForm as initialValues } from "../../constants/formsValues";
import { registerVolunteerValidation as validationSchema } from "../../constants/formValidation";
import { RegisterVolunteerForm } from "../../misc/types";
import { registerVolunteer } from "../../api-client";

const RegisterVolunteer = (): React.JSX.Element => {
  const { showToast } = useAppContext();
  const navigateTo = useNavigate();

  const mutation = useMutation(registerVolunteer, {
    onSuccess: () => {
      showToast({ message: "Volunteer registered successfully", type: "SUCCESS" });
      navigateTo("/login");
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });

  const onSubmit = async (
    data: RegisterVolunteerForm,
    formikHelpers: FormikHelpers<RegisterVolunteerForm>
  ) => {
    await mutation.mutateAsync(data);
    formikHelpers.setSubmitting(false);
  };

  return (
    <main
      id="register-volunteer"
      style={{ backgroundImage: `url(${loginBackgroundImage})` }}
      className="auth h-100vh flex-center-y position-relative"
    >
      <div className="content w-100 p-0 mx-sm-3 mx-2 flex-center overflow-hidden rounded-3">
        <div
          style={{ backgroundImage: `url(${greetBackgroundImage})` }}
          className="greeting h-100 flex-1 flex-center flex-column d-lg-flex d-none text-center"
        >
          <div className="mx-3 text-white">
            <h1 className="fw-semibold display-4 text-black">Welcome to Volunteer</h1>
            <p className="m-0 fs-5 text-black">
              Register as a volunteer and start making an impact today.
            </p>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <FForm className="bg-body form h-100 mx-auto py-5 px-md-5 px-2 d-flex justify-content-center text-black">
              <div>
                <h1 className="text-capitalize text-lg-start text-center fw-semibold text-black fs-3">
                  Register <span className="text-main">Volunteer</span>
                </h1>

                <p className="mb-4 text-capitalize text-black">Create your volunteer account</p>

                <div className="d-flex flex-column gap-4">
                  <InputField type="text" name="username" label="Username" placeholder="Enter username" Icon={<FaUser />} labelStyle="flex-center-y gap-1 fs-6 fw-semibold" iconStyle="flex-center" />
                  <InputField name="email" label="Email" type="email" placeholder="Enter email" Icon={<IoMdMail />} labelStyle="flex-center-y gap-1 fs-6 fw-semibold" iconStyle="flex-center" />
                  <InputField name="password" label="Password" type="password" placeholder="Enter password" Icon={<FaLock />} labelStyle="flex-center-y gap-1 fs-6 fw-semibold" iconStyle="flex-center" />
                  <InputField type="text" name="phone" label="Phone" placeholder="Enter phone number" Icon={<FaPhone />} labelStyle="flex-center-y gap-1 fs-6 fw-semibold" iconStyle="flex-center" />

                  <Button
                    type="submit"
                    variant="main-gradient"
                    className="w-100 mx-auto mb-5 px-5 py-1 d-block rounded-3 fw-bold fs-6"
                    disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
                  >
                    {formik.isSubmitting ? "Wait..." : "Register"}
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

export default RegisterVolunteer;
