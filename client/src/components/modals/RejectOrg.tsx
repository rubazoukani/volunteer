import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form as FForm, FormikHelpers } from "formik";
import InputField from "../../components/form/InputField";
import Button from "../../components/form/Button";
import { RejectOrganization, RejectOrgModal } from "../../misc/types";
import { rejectOrgValidation } from "../../constants/formValidation";
import { rejectOrgModal as initialValues } from "../../constants/formsValues";
import { useMutation } from "react-query";
import { rejectOrganization } from "../../api-client";
import { useAppContext } from "../../context/AppProvider";

const RejectModal = ({ show, onClose, organization, onSuccess }: RejectOrgModal): React.ReactNode => {
  const { showToast } = useAppContext()

  const rejectMutation = useMutation(rejectOrganization, {
    onSuccess: () => {
      showToast({ message: 'Organization rejected', type: 'SUCCESS' })
      onSuccess()
      onClose()
    },
    onError: () => {
      showToast({ message: 'Failed to reject organization', type: 'ERROR' })
    },
  })

  const onSubmit = async (
    data: Omit<RejectOrganization, "id">,
    formik: FormikHelpers<Omit<RejectOrganization, "id">>
  ) => {
    await rejectMutation.mutateAsync({ message: data.message, id: organization.User.id })
    formik.setSubmitting(false)
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reject {organization.name}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={rejectOrgValidation}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <FForm>
            <Modal.Body>
              <InputField
                name="message"
                label="Reason for rejection"
                type="text"
                placeholder="Enter reason..."
                labelStyle="fw-semibold mb-1"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                variant="main-outline"
                className="px-4 rounded-1"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="main"
                className="px-4 rounded-1"
                disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
              >
                {formik.isSubmitting ? "Rejecting..." : "Reject"}
              </Button>
            </Modal.Footer>
          </FForm>
        )}
      </Formik>
    </Modal>
  );
};

export default RejectModal;