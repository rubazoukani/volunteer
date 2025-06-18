import React, { useEffect, useState } from 'react'
import { Card, Button, ButtonGroup } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { FaEdit, FaTrash, FaClock, FaUsers, FaMapMarkerAlt } from 'react-icons/fa'
import { useMutation } from 'react-query'
import { useAppContext } from '../context/AppProvider'
import Loading from '../components/Loading'
import { Chance as ChanceType } from '../misc/types'
import { getChance, deleteChance, joinChance } from '../api-client'
import EditChance from '../components/modals/EditChance'
import MyButton from "../components/form/Button"

const Chance = (): React.JSX.Element => {
  const [chance, setChance] = useState<ChanceType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast, showWarning, user } = useAppContext()

  const fetchChance = async () => {
    if (!id) return
    setIsLoading(true)
    try {
      const data = await getChance(id)
      setChance(data.chance)
    } catch {
      console.error('Failed to fetch chance')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteMutation = useMutation(deleteChance, {
    onSuccess: async () => {
      showToast({ message: 'Chance deleted successfully', type: 'SUCCESS' })
      navigate('/chances')
    },
    onError: () => {
      showToast({ message: 'Failed to delete chance', type: 'ERROR' })
    }
  })

  const joinMutation = useMutation(joinChance, {
    onSuccess: async () => {
      showToast({ message: 'You join the chance successfully', type: 'SUCCESS' })
      navigate('/chances')
    },
    onError: () => {
      showToast({ message: 'Failed to delete chance (try again later)', type: 'ERROR' })
    }
  })

  const onDelete = () => {
    if (!chance) return
    showWarning({
      message: `Are you sure you want to delete ${chance.name}?`,
      btn1: 'Cancel',
      btn2: 'Delete',
      handleBtn2: () => deleteMutation.mutate(chance.id)
    })
  }

  useEffect(() => {
    fetchChance()
  }, [id])

  if (isLoading) return <Loading />
  if (!chance) return <p className="text-danger text-center">Error loading chance</p>

  return (
    <div>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Card.Title className="text-center text-main mb-4">Chance</Card.Title>

          {
            user.role === "organization" &&
            <div className="position-absolute top-0 end-0 p-2">
              <ButtonGroup size="sm">
                <Button variant="warning" onClick={() => setShowEditModal(true)} title="Edit Chance">
                  <FaEdit />
                </Button>
                <Button variant="danger" onClick={onDelete} title="Delete">
                  <FaTrash />
                </Button>
              </ButtonGroup>
            </div>
          }

          <div className="mb-3">
            <strong>Name:</strong> <span className="ms-2">{chance.name}</span>
          </div>

          <div className="mb-3">
            <strong>Description:</strong> <span className="ms-2">{chance.description}</span>
          </div>

          <div className="mb-3 flex-center-y gap-2">
            <FaMapMarkerAlt className="text-secondary" />
            <span>{chance.location}</span>
          </div>

          <div className="mb-3 flex-center-y gap-2">
            <FaClock className="text-secondary" />
            <span>{chance.duration}</span>
          </div>

          <div className="mb-3 flex-center-y gap-2">
            <FaUsers className="text-secondary" />
            <span>{chance.noOfVolunteer} Volunteers</span>
          </div>

          <hr />

          <div className="mt-3">
            <strong>Organization:</strong> <span className="ms-2">{chance.Organization.name}</span>
          </div>

          {user.role === "volunteer" && (
            <div className='mt-3'>
              <MyButton
                variant="main"
                className="ms-auto px-4 py-1 d-block rounded-pill shadow fs-sm"
                onClick={() => joinMutation.mutateAsync(chance.id)}
              >
                Join
              </MyButton>
            </div>
          )}

        </Card.Body>
      </Card>

      <EditChance
        chance={chance}
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={fetchChance}
      />
    </div>
  )
}

export default Chance
