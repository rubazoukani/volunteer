import React, { useEffect, useState } from 'react'
import { Chance } from '../../misc/types'
import Loading from '../../components/Loading'
import { Col, Row } from 'react-bootstrap'
import ChanceCard from '../../components/cards/Chance'
import { useAppContext } from '../../context/AppProvider'
import FloatButton from '../../components/FloatButton'
import { FiPlus } from 'react-icons/fi'
import CreateChance from '../../components/modals/CreateChance'
import { getChances } from '../../api-client'

const Chances = (): React.JSX.Element => {
  const [chances, setChances] = useState<Chance[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAddChanceModalVisible, setIsAddChanceModalVisible] = useState<boolean>(false)

  const { user } = useAppContext()

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const data = await getChances()
      if (data.chances) {
        setChances(data.chances)
      }
    } catch {
      console.error("Fetching chances failed")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) return <Loading />

  return (
    <div>
      <Row className="g-3">
        {chances.map((chance) => (
          <Col key={chance.id} xs={12}>
            <ChanceCard onSuccess={fetchData} chance={chance} />
          </Col>
        ))}
      </Row>

      {
        user.role === "organization" &&
        <FloatButton
          right={15}
          bottom={15}
          onClick={() => setIsAddChanceModalVisible(true)}
        >
          <FiPlus size={35} />
        </FloatButton>
      }

      <CreateChance
        onClose={() => setIsAddChanceModalVisible(false)}
        onSuccess={fetchData}
        show={isAddChanceModalVisible}
      />
    </div>
  )
}

export default Chances
