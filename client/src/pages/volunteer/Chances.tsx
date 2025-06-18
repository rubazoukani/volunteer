import React, { useEffect, useState } from 'react'
import { Chance } from '../../misc/types'
import Loading from '../../components/Loading'
import { Col, Row, Form } from 'react-bootstrap'
import ChanceCard from '../../components/cards/Chance'
import { useAppContext } from '../../context/AppProvider'
import FloatButton from '../../components/FloatButton'
import { FiPlus } from 'react-icons/fi'
import CreateChance from '../../components/modals/CreateChance'
import { getUnjoinedChances } from '../../api-client'

const Chances = (): React.JSX.Element => {
  const [chances, setChances] = useState<Chance[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAddChanceModalVisible, setIsAddChanceModalVisible] = useState<boolean>(false)

  const { user } = useAppContext()

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const data = await getUnjoinedChances(user.id)
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

  const filteredChances = chances.filter((chance) =>
    chance.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) return <Loading />

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Search chances by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3"
      />

      <Row className="g-3">
        {filteredChances.length > 0 ? (
          filteredChances.map((chance) => (
            <Col key={chance.id} xs={12}>
              <ChanceCard onSuccess={fetchData} chance={chance} />
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">No chances found.</p>
        )}
      </Row>

      {user.role === "organization" && (
        <FloatButton
          right={15}
          bottom={15}
          onClick={() => setIsAddChanceModalVisible(true)}
        >
          <FiPlus size={35} />
        </FloatButton>
      )}

      <CreateChance
        onClose={() => setIsAddChanceModalVisible(false)}
        onSuccess={fetchData}
        show={isAddChanceModalVisible}
      />
    </div>
  )
}

export default Chances
