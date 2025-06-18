import React from "react";
import { Modal } from "react-bootstrap";
import { Form as FForm, Formik, FormikHelpers } from "formik";
import InputField from "../../components/form/InputField";
import Button from "../../components/form/Button";
import { editChance } from "../../api-client";
import { useMutation } from "react-query";
import { useAppContext } from "../../context/AppProvider";
import { createChanceValidation } from "../../constants/formValidation";
import { AddChanceForm, EditChanceModal } from "../../misc/types";

const EditChance = ({ show, onClose, onSuccess, chance }: EditChanceModal): React.ReactNode => {
  const { showToast } = useAppContext();

  const updateMutation = useMutation(editChance, {
    onSuccess: () => {
      showToast({ message: "Chance updated successfully", type: "SUCCESS" });
      onClose();
      onSuccess();
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });

  const handleSubmit = async (
    values: AddChanceForm,
    formik: FormikHelpers<AddChanceForm>
  ) => {
    await updateMutation.mutateAsync({ id: chance.id, formData: values });
    formik.setSubmitting(false);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Chance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: chance.name || "",
            description: chance.description || "",
            location: chance.location || "",
            noOfVolunteer: chance.noOfVolunteer || 0,
            duration: chance.duration || "",
          }}
          validationSchema={createChanceValidation}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <FForm className="d-flex flex-column gap-3">
              <InputField
                type="text"
                name="name"
                label="Name"
                placeholder="Enter chance name"
                styles="text-black"
                labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                iconStyle="flex-center"
              />

              <InputField
                type="text"
                name="description"
                label="Description"
                placeholder="Enter description"
                styles="text-black"
                labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                iconStyle="flex-center"
              />

              <InputField
                type="text"
                name="location"
                label="Location"
                placeholder="Enter location"
                styles="text-black"
                labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                iconStyle="flex-center"
              />

              <InputField
                type="text"
                name="noOfVolunteer"
                label="Number of Volunteers"
                placeholder="Enter number of volunteers"
                styles="text-black"
                labelStyle="flex-center-y gap-1 fs-6 fw-semibold"
                iconStyle="flex-center"
              />

              <InputField
                type="text"
                name="duration"
                label="Duration"
                placeholder="Enter duration (e.g., 2 weeks)"
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

export default EditChance;
