import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap'
import { BASE_URL } from '../utils/config'
import ManageUsers from '../components/Admin/ManageUsers'
import ManageTours from '../components/Admin/ManageTours'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTours: 0
  })
  const [activeComponent, setActiveComponent] = useState(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [usersResponse, toursResponse] = await Promise.all([
        fetch(`${BASE_URL}/users`, {
          credentials: 'include'
        }),
        fetch(`${BASE_URL}/tours`, {
          credentials: 'include'
        })
      ])

      const usersData = await usersResponse.json()
      const toursData = await toursResponse.json()

      // Handle different response formats for users
      const userCount = Array.isArray(usersData) 
        ? usersData.length 
        : Array.isArray(usersData.data) 
          ? usersData.data.length 
          : 0

      // Handle different response formats for tours
      const tourCount = Array.isArray(toursData) 
        ? toursData.length 
        : Array.isArray(toursData.data) 
          ? toursData.data.length 
          : 0

      setStats({
        totalUsers: userCount,
        totalTours: tourCount
      })

      console.log('Users Data:', usersData) // Debug log
      console.log('Tours Data:', toursData) // Debug log
    } catch (error) {
      console.error('Error fetching stats:', error)
      setStats({
        totalUsers: 0,
        totalTours: 0
      })
    }
  }

  return (
    <section className="pt-0">
      <Container>
        <div className="admin-dashboard p-4">
          <h2 className="mb-4">Admin Dashboard</h2>
          
          <Row className="mb-4">
            <Col lg='6' md='6' sm='6'>
              <Card className="d-flex">
                <CardBody>
                  <div className="stats-info">
                    <h5>Total Users</h5>
                    <span className="number">{stats.totalUsers}</span>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg='6' md='6' sm='6'>
              <Card className="d-flex">
                <CardBody>
                  <div className="stats-info">
                    <h5>Total Tours</h5>
                    <span className="number">{stats.totalTours}</span>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col lg='6' md='6' sm='6'>
              <Button 
                color={activeComponent === 'manageUsers' ? 'primary' : 'secondary'}
                className="w-100"
                onClick={() => setActiveComponent('manageUsers')}
              >
                Manage Users
              </Button>
            </Col>

            <Col lg='6' md='6' sm='6'>
              <Button 
                color={activeComponent === 'manageTours' ? 'primary' : 'secondary'}
                className="w-100"
                onClick={() => setActiveComponent('manageTours')}
              >
                Manage Tours
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              {activeComponent === 'manageUsers' && <ManageUsers />}
              {activeComponent === 'manageTours' && <ManageTours />}
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  )
}

export default AdminDashboard