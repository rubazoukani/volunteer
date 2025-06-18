import React, { useEffect, useState } from 'react'
import { Card, Button, ButtonGroup } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import {
  FaEdit,
  FaTrash,
  FaKey,
  FaBuilding,
  FaCheckCircle,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaGlobe,
} from 'react-icons/fa'
import { useMutation, useQueryClient } from 'react-query'
import { useAppContext } from '../../context/AppProvider'
import Loading from '../../components/Loading'
import { Organization } from '../../misc/types'
import { deleteOrganization, getOrganization } from '../../api-client'
import EditUser from '../../components/modals/EditUser'
import EditPassword from '../../components/modals/EditPassword'
import EditOrganization from '../../components/modals/EditOrganization'

const OrganizationProfile = (): React.JSX.Element => {
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showEditUserModal, setShowEditUserModal] = useState(false)
  const [showEditPasswordModal, setShowEditPasswordModal] = useState(false)
  const [showEditOrgModal, setShowEditOrgModal] = useState(false)

  const { user, showToast, showWarning } = useAppContext()
  const queryClient = useQueryClient()
  const { id } = useParams()
  const navigator = useNavigate()

  const deleteMutation = useMutation(deleteOrganization, {
    onSuccess: async () => {
      showToast({ message: 'Organization deleted successfully', type: 'SUCCESS' })
      await queryClient.invalidateQueries("validateToken");
      navigator("/")
    },
    onError: () => {
      showToast({ message: 'Failed to delete organization', type: 'ERROR' })
    },
  })

  const fetchData = async () => {
    const userId = id || user.id

    setIsLoading(true)
    try {
      const data = await getOrganization(userId)
      if (data.organization) setOrganization(data.organization)
    } catch {
      console.error('Failed to fetch organization')
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = () => {
    if (!organization) return
    showWarning({
      message: `Are you sure you want to delete ${organization.name}?`,
      handleBtn2: () => deleteMutation.mutate(organization.User.id),
      btn1: 'Cancel',
      btn2: 'Delete',
    })
  }

  useEffect(() => {
    fetchData()
  }, [id])

  if (isLoading) return <Loading />
  if (!organization) return <p className="text-danger text-center">Error loading organization</p>

  return (
    <div>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Card.Title className="text-center text-main mb-4">Organization Profile</Card.Title>

          <div className="position-absolute top-0 end-0 p-2">
            <ButtonGroup size="sm">
              <Button variant="warning" onClick={() => setShowEditUserModal(true)} title="Edit User">
                <FaEdit />
              </Button>
              <Button variant="danger" onClick={onDelete} title="Delete">
                <FaTrash />
              </Button>
              {user.id === organization.User.id && (
                <Button
                  variant="warning"
                  onClick={() => setShowEditPasswordModal(true)}
                  title="Change Password"
                >
                  <FaKey />
                </Button>
              )}
            </ButtonGroup>
          </div>

          <div className="mb-3">
            <strong>Username:</strong> <span className="ms-2">{organization.User.username}</span>
          </div>
          <div className="mb-3">
            <strong>Email:</strong> <span className="ms-2">{organization.User.email}</span>
          </div>
          <div className="mb-3">
            <strong>Phone:</strong> <span className="ms-2">{organization.User.phone}</span>
          </div>

          <hr />

          <Card.Title className="mt-4 mb-3 flex-center-y text-start text-main position-relative">
            <FaBuilding className="me-2" />
            Organization Info

            <Button
              variant="warning"
              size="sm"
              className="position-absolute top-0 end-0"
              onClick={() => setShowEditOrgModal(true)}
              title="Edit Organization"
            >
              <FaEdit />
            </Button>
          </Card.Title>

          <div className="mb-3 flex-center-y position-relative">
            <strong>Name:</strong>
            <span className="ms-2">{organization.name}</span>
            {organization.verified && (
              <FaCheckCircle
                size={30}
                className="ms-2 p-1 rounded-circle text-success"
                title="Verified"
              />
            )}
          </div>
          <div className="mb-3">
            <strong>Description:</strong> <span className="ms-2">{organization.description}</span>
          </div>
          <div className="mb-3">
            <strong>CR Number:</strong> <span className="ms-2">{organization.commercialRegister}</span>
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

      <EditUser
        user={organization.User}
        show={showEditUserModal}
        onClose={() => setShowEditUserModal(false)}
        onSuccess={fetchData}
      />

      <EditPassword
        userId={organization.User.id}
        show={showEditPasswordModal}
        onClose={() => setShowEditPasswordModal(false)}
        onSuccess={fetchData}
      />

      <EditOrganization
        organization={organization}
        show={showEditOrgModal}
        onClose={() => setShowEditOrgModal(false)}
        onSuccess={fetchData}
      />
    </div>
  )
}

export default OrganizationProfile
