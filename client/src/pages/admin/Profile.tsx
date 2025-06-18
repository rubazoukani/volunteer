import React, { useState } from 'react'
import { useAppContext } from '../../context/AppProvider'
import { Button, Card } from 'react-bootstrap'
import EditUser from '../../components/modals/EditUser'
import { FaEdit } from 'react-icons/fa'
import { useQueryClient } from 'react-query'

const Profile = (): React.JSX.Element => {
  const [isEditUserModalVisible, setIsEditUserModalVisible] = useState<boolean>(false)

  const { user } = useAppContext()
  const queryClient = useQueryClient()

  const onEdit = () => {
    setIsEditUserModalVisible(true)
  }

  const onSuccess = async () => {
    await queryClient.invalidateQueries("validateToken");
  }

  return (
    <div>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Card.Title className="mb-4 text-center text-main">Admin Profile</Card.Title>
          <Button
            size='sm'
            className='position-absolute top-0 end-0'
            variant='warning'
            onClick={onEdit}
            title="Edit Profile">
            <FaEdit />
          </Button>

          <div className="mb-3">
            <strong>Username:</strong> <span className="ms-2">{user.username}</span>
          </div>
          <div className="mb-3">
            <strong>Email:</strong> <span className="ms-2">{user.email}</span>
          </div>
          <div className="mb-3">
            <strong>Phone:</strong> <span className="ms-2">{user.phone}</span>
          </div>
        </Card.Body>
      </Card>

      <EditUser
        onClose={() => setIsEditUserModalVisible(false)}
        show={isEditUserModalVisible}
        user={user}
        onSuccess={onSuccess}
      />
    </div>
  )
}

export default Profile
