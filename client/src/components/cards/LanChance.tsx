import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa'
import { LanChanceCard } from '../../misc/types'
import Button from '../form/Button'
import { useAppContext } from '../../context/AppProvider'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { joinChance } from '../../api-client'

const LanChance = ({ chance }: LanChanceCard): React.ReactNode => {
  const { user, showToast } = useAppContext()
  const navigator = useNavigate()
  const [isJoin, setIsJoin] = useState<boolean>()

  const handleLogin = () => {
    navigator("/login")
  }

  const joinMutation = useMutation(joinChance, {
    onMutate: () => setIsJoin(true),
    onSuccess: async () => {
      showToast({ message: 'You join the chance successfully', type: 'SUCCESS' })
      navigator('/chances')
    },
    onError: () => {
      showToast({ message: 'Failed to delete chance (try again later)', type: 'ERROR' })
    },
    onSettled: () => setIsJoin(false)
  })

  const handleJoin = () => {
    joinMutation.mutateAsync(chance.id)
  }

  return (
    <Card className="lan-chance-card h-100 border-0 shadow-sm transition-03">
      <Card.Body>
        <Card.Title className="mb-2 text-main">{chance.name}</Card.Title>
        <Card.Subtitle className="mb-3 fs-sm text-muted">
          {chance.Organization.name}
        </Card.Subtitle>

        <Card.Text className="mb-3">{chance.description}</Card.Text>

        <div className="mb-3 text-secondary small">
          <p className="m-0 flex-center-y">
            <FaMapMarkerAlt className="me-2" />
            {chance.location}
          </p>
          <p className="m-0 flex-center-y">
            <FaUsers className="me-2" />
            {chance.noOfVolunteer} Volunteers
          </p>
          <p className="m-0 flex-center-y">
            <FaClock className="me-2" />
            {chance.duration}
          </p>
        </div>

        {
          user.role === "guest"
          && <Button
            onClick={handleLogin}
            variant="main-outline"
            className='d-block rounded-2 ms-auto py-1 px-3'>Login</Button>
        }

        {
          user.role === "volunteer"
          && <Button
            onClick={handleJoin}
            variant="main"
            className='d-block rounded-2 ms-auto py-1 px-3'
            disabled={isJoin}
          >Join</Button>
        }
      </Card.Body>
    </Card>
  )
}

export default LanChance
