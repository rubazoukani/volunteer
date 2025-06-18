import React from 'react'
import { Card, Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { FaUsers, FaClock, FaEye, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppProvider'
import { useMutation } from 'react-query'
import { deleteChance } from '../../api-client'
import { ChanceCard as ChanceCardType } from '../../misc/types'

const ChanceCard = ({ chance, onSuccess }: ChanceCardType): React.JSX.Element => {
  const navigate = useNavigate()
  const { showToast, showWarning, user } = useAppContext()

  const deleteMutation = useMutation(deleteChance, {
    onSuccess: () => {
      showToast({ message: 'Chance deleted successfully', type: 'SUCCESS' })
      onSuccess()
    },
    onError: () => {
      showToast({ message: 'Failed to delete chance', type: 'ERROR' })
    },
  })

  const onView = () => {
    navigate(`/chances/${chance.id}`)
  }

  const onDelete = () => {
    showWarning({
      message: `Are you sure you want to delete ${chance.name}?`,
      btn1: 'Cancel',
      btn2: 'Delete',
      handleBtn2: () => deleteMutation.mutate(chance.id),
    })
  }

  return (
    <div className="position-relative">
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <div className="position-absolute top-0 end-0 p-2">
            <ButtonGroup size="sm">
              <Button variant="primary" onClick={onView} title="View">
                <FaEye />
              </Button>
              {
                user.role === "organization" &&
                <Button variant="danger" onClick={onDelete} title="Delete">
                  <FaTrash />
                </Button>
              }
            </ButtonGroup>
          </div>

          <Row>
            <Col md={6}>
              <p className="m-0 fw-bold fs-5 text-main">{chance.name}</p>
              <span className="text-muted">{chance.Organization.name}</span>
            </Col>
            <Col md={6}>
              <div className="flex-center-y gap-2">
                <FaClock className="text-secondary" />
                <span>{chance.duration}</span>
              </div>
              <div className="mt-1 flex-center-y gap-2">
                <FaUsers className="text-secondary" />
                <span>{chance.noOfVolunteer} Volunteers</span>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ChanceCard
