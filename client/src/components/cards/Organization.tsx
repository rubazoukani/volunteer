import React from 'react'
import { Card, ButtonGroup, Button } from 'react-bootstrap'
import { FaCheckCircle, FaFacebook, FaInstagram, FaYoutube, FaGlobe, FaTrash, FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppProvider'
import { useMutation } from 'react-query'
import { deleteOrganization, verifyOrganization } from '../../api-client'
import { organizationCard } from '../../misc/types'
import RejectModal from '../modals/RejectOrg'

const OrganizationCard = ({ organization, onSuccess }: organizationCard): React.ReactNode => {
  const [showRejectModal, setShowRejectModal] = React.useState(false)

  const navigate = useNavigate()
  const { showToast, showWarning } = useAppContext()

  const deleteMutation = useMutation(() => deleteOrganization(organization.User.id), {
    onSuccess: () => {
      showToast({ message: 'Organization deleted successfully', type: 'SUCCESS' })
      onSuccess()
    },
    onError: () => {
      showToast({ message: 'Failed to delete organization', type: 'ERROR' })
    },
  })

  const verifyMutation = useMutation(verifyOrganization, {
    onSuccess: () => {
      showToast({ message: 'Organization verified successfully', type: 'SUCCESS' })
      onSuccess()
    },
    onError: () => {
      showToast({ message: 'Failed to verify organization', type: 'ERROR' })
    },
  })

  const onView = () => {
    navigate(`/organizations/${organization.User.id}`)
  }

  const onDelete = () => {
    showWarning({
      message: `Are you sure you want to delete ${organization.name}?`,
      btn1: 'Cancel',
      btn2: 'Delete',
      handleBtn2: () => deleteMutation.mutate()
    })
  }

  return (
    <div className='h-100'>
      <Card className="h-100 border-0 shadow-sm position-relative">
        <Card.Body className="d-flex justify-content-between flex-column">
          <div className="position-absolute top-0 end-0 p-2">
            <ButtonGroup size="sm">
              {organization.verified ? (
                <>
                  <Button variant="primary" onClick={onView} title="View">
                    <FaEye />
                  </Button>
                  <Button variant="danger" onClick={onDelete} title="Delete">
                    <FaTrash />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="success" onClick={() => verifyMutation.mutate(organization.User.id)}>
                    Accept
                  </Button>
                  <Button variant="danger" onClick={() => setShowRejectModal(true)}>
                    Reject
                  </Button>
                </>
              )}
            </ButtonGroup>
          </div>

          <div>
            <Card.Title className="mb-2 flex-center-y fw-bold fs-5 text-main">
              {organization.name}
              {organization.verified && <FaCheckCircle className="ms-2 text-success" title="Verified" />}
            </Card.Title>

            <Card.Text className="mb-1"><strong>CR:</strong> {organization.commercialRegister}</Card.Text>

            <div className="mt-3">
              <div><strong>Username:</strong> {organization.User.username}</div>
              <div><strong>Email:</strong> {organization.User.email}</div>
              <div><strong>Phone:</strong> {organization.User.phone}</div>
            </div>
          </div>

          <div className="mt-4 d-flex justify-content-end gap-2">
            {organization.facebook && (
              <Button
                variant="primary"
                size="sm"
                href={organization.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <FaFacebook />
              </Button>
            )}
            {organization.instagram && (
              <Button
                variant="danger"
                size="sm"
                href={organization.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <FaInstagram />
              </Button>
            )}
            {organization.youtube && (
              <Button
                variant="dark"
                size="sm"
                href={organization.youtube}
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
              >
                <FaYoutube />
              </Button>
            )}
            {organization.website && (
              <Button
                variant="success"
                size="sm"
                href={organization.website}
                target="_blank"
                rel="noopener noreferrer"
                title="Website"
              >
                <FaGlobe />
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

      <RejectModal
        show={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        organization={organization}
        onSuccess={onSuccess}
      />

    </div>
  )
}

export default OrganizationCard
