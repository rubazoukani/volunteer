import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form as FForm, FormikHelpers } from "formik";
import InputField from "../../components/form/InputField";
import Button from "../../components/form/Button";
import { EditOrganizationForm, EditOrganizationModal } from "../../misc/types";
import { editOrganizationValidation } from "../../constants/formValidation";
import { useMutation } from "react-query";
import { updateOrganization } from "../../api-client";
import { useAppContext } from "../../context/AppProvider";

const EditOrganization = ({
  organization,
  show,
  onClose,
  onSuccess,
}: EditOrganizationModal): React.ReactNode => {
  const { showToast } = useAppContext();

  const editMutation = useMutation(updateOrganization, {
    onSuccess: () => {
      showToast({ message: "Organization updated successfully", type: "SUCCESS" });
      onSuccess();
      onClose();
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });

  const handleSubmit = async (
    values: EditOrganizationForm,
    formik: FormikHelpers<EditOrganizationForm>
  ) => {
    await editMutation.mutateAsync({ id: organization.User.id, formData: values });
    formik.resetForm();
    formik.setSubmitting(false);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Organization</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: organization.name,
            description: organization.description,
            facebook: organization.facebook,
            youtube: organization.youtube,
            instagram: organization.instagram,
            website: organization.website,
            commercialRegister: organization.commercialRegister,
          }}
          validationSchema={editOrganizationValidation}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <FForm className="d-flex flex-column gap-3">
              <InputField
                type="text"
                name="name"
                label="Name"
                placeholder="Organization name"
                styles="text-black"
                labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                iconStyle="flex-center"
              />

              <InputField
                type="text"
                name="description"
                label="Description"
                placeholder="Short description"
                styles="text-black"
                labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                iconStyle="flex-center"
              />

              <InputField
                type="text"
                name="commercialRegister"
                label="Commercial Register"
                placeholder="CR number"
                styles="text-black"
                labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                iconStyle="flex-center"
              />

              <InputField
                type="text"
                name="facebook"
                label="Facebook"
                placeholder="Facebook link"
                styles="text-black"
                labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                iconStyle="flex-center"
              />

              <InputField
                type="text"
                name="youtube"
                label="YouTube"
                placeholder="YouTube link"
                styles="text-black"
                labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                iconStyle="flex-center"
              />

              <InputField
                type="text"
                name="instagram"
                label="Instagram"
                placeholder="Instagram link"
                styles="text-black"
                labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                iconStyle="flex-center"
              />

              <InputField
                type="text"
                name="website"
                label="Website"
                placeholder="Website link"
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

export default EditOrganization;
