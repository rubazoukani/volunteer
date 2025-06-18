import React, { useEffect, useState } from 'react'
import { getVolunteers } from '../../api-client'
import { Volunteer } from '../../misc/types'
import Loading from '../../components/Loading'
import { Col, Row } from 'react-bootstrap'
import VolunteerCard from '../../components/cards/Volunteer'

const Volunteers = (): React.JSX.Element => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const data = await getVolunteers()
      if (data.volunteers) {
        setVolunteers(data.volunteers)
      }
    } catch {
      console.error("Fetching volunteers failed")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading)
    return <Loading />

  return (
    <div>
      <Row className='g-3'>
        {volunteers.map((volunteer) => (
          <Col key={volunteer.id} xs={12} sm={6} lg={4}>
            <VolunteerCard volunteer={volunteer} onSuccess={fetchData} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Volunteers