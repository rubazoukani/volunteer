import React from "react";
import { Modal } from "react-bootstrap";
import { Form as FForm, Formik, FormikHelpers } from "formik";
import InputField from "../../components/form/InputField";
import Button from "../../components/form/Button";
import { updateUser } from "../../api-client";
import { EditUserForm, EditUserModal } from "../../misc/types";
import { editUserValidation } from "../../constants/formValidation";
import { useMutation } from "react-query";
import { useAppContext } from "../../context/AppProvider";

const EditUser = ({
  user,
  show,
  onClose,
  onSuccess,
}: EditUserModal): React.ReactNode => {
  const { showToast } = useAppContext()

  const editMutation = useMutation(updateUser, {
    onSuccess: () => {
      showToast({ message: 'User edited successfully', type: 'SUCCESS' })
      onSuccess()
      onClose()
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: 'ERROR' })
    },
  })

  const handleSubmit = async (
    values: EditUserForm,
    formik: FormikHelpers<EditUserForm>
  ) => {
    await editMutation.mutateAsync({ id: user.id, formData: values })
    formik.resetForm()
    formik.setSubmitting(false)
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            username: user.username,
            email: user.email,
            phone: user.phone,
          }}
          validationSchema={editUserValidation}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <FForm className="d-flex flex-column gap-3">
              <InputField
                type="text"
                name="username"
                label="Username"
                placeholder="Enter your username"
                styles="text-black"
                labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                iconStyle="flex-center"
              />

              <InputField
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                styles="text-black"
                labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                iconStyle="flex-center"
              />

              <InputField
                type="text"
                name="phone"
                label="Phone"
                placeholder="Enter your phone number"
                styles="text-black"
                labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                iconStyle="flex-center"
              />

              <Button
                type="submit"
                variant="main-gradient"
                className="w-100 py-2 rounded-3 fw-bold fs-6"
                disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
              >
                {formik.isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </FForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EditUser;
