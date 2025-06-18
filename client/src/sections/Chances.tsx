import React, { useEffect, useState } from 'react'
import { Chance } from '../misc/types'
import { getChances, getUnjoinedChances } from '../api-client'
import { Col, Container, Row } from 'react-bootstrap'
import LanChance from '../components/cards/LanChance'
import { useAppContext } from '../context/AppProvider'

const Chances = (): React.JSX.Element => {
  const [chances, setChances] = useState<Chance[]>([])
  const { user } = useAppContext()

  const fetchAllChance = async () => {
    try {
      const data = await getChances()
      setChances(data.chances)
    } catch {
      console.error('Failed to fetch chance')
    }
  }

  const fetchUnJoinedChances = async () => {
    try {
      const data = await getUnjoinedChances(user.id)
      setChances(data.chances)
    } catch {
      console.error('Failed to fetch chance')
    }
  }

  const fetchChances = async () => {
    if (user.role === "volunteer")
      await fetchUnJoinedChances()

    else
      await fetchAllChance()
  }

  useEffect(() => {
    fetchChances()
  }, [])

  return (
    <section id='lan-chances'>
      <h1 className='header-title w-fit mx-auto mb-5 px-5 transition-03'>Chances</h1>

      <Container>
        <Row className='g-3'>
          {
            chances.map(chance =>
              <Col lg={4} md={6} sm={12} key={`chance-${chance.id}`}>
                <LanChance chance={chance} />
              </Col>
            )
          }
        </Row>
      </Container>
    </section>
  )
}

export default Chances