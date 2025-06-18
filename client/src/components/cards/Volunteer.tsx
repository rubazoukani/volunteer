import React from 'react'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { VolunteerCard } from '../../misc/types'
import { FaUser, FaEnvelope, FaPhone, FaUserTag, FaEye, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppProvider'
import { useMutation } from 'react-query'
import { deleteVolunteer } from '../../api-client'


const VolunteerCard = ({ volunteer, onSuccess }: VolunteerCard): React.ReactNode => {
  const navigator = useNavigate()
  const { showToast, showWarning } = useAppContext()

  const deleteMutation = useMutation(deleteVolunteer, {
    onSuccess: () => {
      showToast({ message: 'Volunteer deleted successfully', type: 'SUCCESS' })
      onSuccess()
    },
    onError: () => {
      showToast({ message: 'Failed to delete volunteer (try again later)', type: 'ERROR' })
    },
  })

  const onView = () => {
    navigator(`${volunteer.id}`)
  }

  const onDelete = () => {
    showWarning({
      message: `Are you sure you want to delete ${volunteer.username}?`,
      handleBtn2: () => deleteMutation.mutate(volunteer.id),
      btn1: 'Cancel',
      btn2: 'Delete'
    })
  }

  return (
    <Card className="h-100 border-0 shadow-sm position-relative">
      <Card.Body>
        <div className="position-absolute top-0 end-0 p-2">
          <ButtonGroup size="sm">
            <Button variant="primary" onClick={() => onView()} title="View">
              <FaEye />
            </Button>
            <Button variant="danger" onClick={() => onDelete()} title="Delete">
              <FaTrash />
            </Button>
          </ButtonGroup>
        </div>

        <Card.Title className="mb-3">
          <FaUser className="me-2" />
          {volunteer.username}
        </Card.Title>
        <Card.Text className="fs-sm">
          <FaEnvelope className="me-2 text-muted" />
          <strong>Email:</strong> {volunteer.email}
        </Card.Text>
        <Card.Text className="fs-sm">
          <FaPhone className="me-2 text-muted" />
          <strong>Phone:</strong> {volunteer.phone}
        </Card.Text>
        <Card.Text className="fs-sm">
          <FaUserTag className="me-2 text-muted" />
          <strong>Role:</strong> {volunteer.role}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default VolunteerCard
