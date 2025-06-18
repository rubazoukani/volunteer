import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppProvider'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Volunteer } from '../../misc/types'
import { deleteVolunteer, getVolunteer } from '../../api-client'
import Loading from '../../components/Loading'
import { useMutation, useQueryClient } from 'react-query'
import { FaEdit, FaTrash, FaKey } from 'react-icons/fa'
import EditUser from '../../components/modals/EditUser'
import EditPassword from '../../components/modals/EditPassword'

const Profile = (): React.JSX.Element => {
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEditUserModalVisible, setIsEditUserModalVisible] = useState<boolean>(false)
  const [isEditPasswordModalVisible, setIsEditPasswordModalVisible] = useState<boolean>(false)

  const { user, showToast, showWarning } = useAppContext()
  const queryClient = useQueryClient()
  const { id } = useParams()
  const navigator = useNavigate()

  const deleteMutation = useMutation(deleteVolunteer, {
    onSuccess: async () => {
      showToast({ message: 'Volunteer deleted successfully', type: 'SUCCESS' })
      await queryClient.invalidateQueries("validateToken");
      navigator("/")
    },
    onError: () => {
      showToast({ message: 'Failed to delete volunteer (try again later)', type: 'ERROR' })
    },
  })

  const onDelete = () => {
    if (!volunteer) return
    showWarning({
      message: `Are you sure you want to delete ${volunteer.username}?`,
      handleBtn2: () => deleteMutation.mutate(volunteer.id),
      btn1: 'Cancel',
      btn2: 'Delete'
    })
  }

  const onEdit = () => {
    setIsEditUserModalVisible(true)
  }
  const onEditPassword = () => setIsEditPasswordModalVisible(true)

  const fetchData = async () => {
    const userId = id || user.id

    setIsLoading(true)
    try {
      const data = await getVolunteer(userId)
      if (data.volunteer) {
        setVolunteer(data.volunteer)
      }
    } catch {
      console.error("Fetching volunteers failed")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  if (isLoading)
    return <Loading />

  if (!volunteer)
    return <p className='text-center text-danger'>Error happened</p>

  return (
    <div>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Card.Title className="mb-4 text-center text-main">Volunteer Profile</Card.Title>

          <div className='position-absolute top-0 end-0 p-2'>
            <ButtonGroup size='sm'>
              <Button variant='warning' onClick={onEdit} title="Edit Profile">
                <FaEdit />
              </Button>
              <Button variant='danger' onClick={onDelete} title="Delete">
                <FaTrash />
              </Button>
              {
                user.id === volunteer.id &&
                <Button variant='warning' onClick={onEditPassword} title="Change Password">
                  <FaKey />
                </Button>
              }
            </ButtonGroup>
          </div>

          <div className="mb-3">
            <strong>Username:</strong> <span className="ms-2">{volunteer.username}</span>
          </div>
          <div className="mb-3">
            <strong>Email:</strong> <span className="ms-2">{volunteer.email}</span>
          </div>
          <div className="mb-3">
            <strong>Phone:</strong> <span className="ms-2">{volunteer.phone}</span>
          </div>
        </Card.Body>
      </Card >

      <EditUser
        user={volunteer}
        show={isEditUserModalVisible}
        onClose={() => setIsEditUserModalVisible(false)}
        onSuccess={fetchData}
      />

      <EditPassword
        userId={volunteer.id}
        show={isEditPasswordModalVisible}
        onClose={() => setIsEditPasswordModalVisible(false)}
        onSuccess={fetchData}
      />
    </div>
  )
}

export default Profile
