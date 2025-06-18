import React, { useEffect, useState } from 'react'
import { getOrganizations } from '../../api-client'
import { Organization } from '../../misc/types'
import Loading from '../../components/Loading'
import { Col, Row } from 'react-bootstrap'
import OrganizationCard from '../../components/cards/Organization'

const Organizations = (): React.JSX.Element => {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const data = await getOrganizations()
      if (data.organizations) {
        setOrganizations(data.organizations)
      }
    } catch {
      console.error("Fetching organizations failed")
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
        {organizations.map((org) => (
          <Col key={org.id} xs={12} sm={6} lg={4}>
            <OrganizationCard
              onSuccess={fetchData}
              organization={org} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Organizations
