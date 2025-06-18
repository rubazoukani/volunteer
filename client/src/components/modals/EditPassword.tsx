import React from "react";
import { Modal } from "react-bootstrap";
import { Form as FForm, Formik, FormikHelpers } from "formik";
import InputField from "../form/InputField";
import Button from "../form/Button";
import { editPassword } from "../../api-client";
import { useAppContext } from "../../context/AppProvider";
import { EditPasswordForm, EditPasswordModal } from "../../misc/types";
import { editPasswordValidation } from "../../constants/formValidation";
import { useMutation } from "react-query";
import { editPassword as initialValues } from "../../constants/formsValues"

const EditPassword = ({ userId, show, onClose, onSuccess }: EditPasswordModal): React.ReactNode => {
  const { showToast } = useAppContext();

  const editMutation = useMutation(editPassword, {
    onSuccess: () => {
      showToast({ message: 'User password edited successfully', type: 'SUCCESS' })
      onSuccess()
      onClose()
    },
    onError: (err: Error) => {
      console.log(err)
      showToast({ message: err.message, type: 'ERROR' })
    },
  })

  const handleSubmit = async (
    values: EditPasswordForm,
    formik: FormikHelpers<EditPasswordForm>
  ) => {
    await editMutation.mutateAsync({ id: userId, formData: values })
    formik.resetForm()
    formik.setSubmitting(false)
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={editPasswordValidation}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <FForm className="d-flex flex-column gap-3">
              <InputField
                type="password"
                name="password"
                label="Password"
                placeholder="Enter new password"
                styles="text-black"
              />
              <InputField
                type="password"
                name="newPassword"
                label="New Password"
                placeholder="Enter new password"
                styles="text-black"
              />
              <InputField
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Re-enter password"
                styles="text-black"
              />
              <Button
                type="submit"
                variant="main-gradient"
                className="w-100 py-2  rounded-3 fw-bold fs-6"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {formik.isSubmitting ? "Updating..." : "Change Password"}
              </Button>
            </FForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EditPassword;
