import React, { useState, useEffect, useContext } from 'react'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { BASE_URL } from '../../utils/config'
import { AuthContext } from '../../context/AuthContext'

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [modal, setModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [error, setError] = useState(null)
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  })

  const { user, token } = useContext(AuthContext)

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers()
    }
  }, [user])

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch users')
      }
      setUsers(result.data || [])
      setError(null)
    } catch (error) {
      console.error('Error fetching users:', error)
      setError(error.message)
      setUsers([])
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }
    
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete user')
      }
      alert('User deleted successfully')
      fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
      setError(error.message)
    }
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    try {
      console.log('Creating user with data:', newUser)
      console.log('Token:', token)

      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(newUser)
      })

      const responseText = await response.text()
      console.log('Raw response:', responseText)

      let result
      try {
        result = JSON.parse(responseText)
      } catch (e) {
        console.error('Failed to parse response:', responseText)
        throw new Error('Invalid response from server')
      }

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create user')
      }

      alert('User created successfully')
      setModal(false)
      setNewUser({
        username: '',
        email: '',
        password: '',
        role: 'user'
      })
      fetchUsers()
    } catch (error) {
      console.error('Error creating user:', error)
      setError(error.message)
    }
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault()
    try {
      const updateData = { ...editingUser }
      if (!updateData.password) {
        delete updateData.password // Don't send password if it's empty
      }

      const response = await fetch(`${BASE_URL}/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(updateData)
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update user')
      }
      alert('User updated successfully')
      setModal(false)
      setEditingUser(null)
      fetchUsers()
    } catch (error) {
      console.error('Error updating user:', error)
      setError(error.message)
    }
  }

  const toggleModal = () => {
    setModal(!modal)
    setEditingUser(null)
    setNewUser({
      username: '',
      email: '',
      password: '',
      role: 'user'
    })
    setError(null)
  }

  const openEditModal = (user) => {
    setEditingUser({ ...user, password: '' }) // Clear password when editing
    setModal(true)
    setError(null)
  }

  if (!user || user.role !== 'admin') {
    return <Alert color="danger">Access denied. Admin privileges required.</Alert>
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Users</h2>
        <Button color="primary" onClick={toggleModal}>Create New User</Button>
      </div>

      {error && <Alert color="danger">{error}</Alert>}

      <Table responsive>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No users found</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button color="info" size="sm" className="me-2" onClick={() => openEditModal(user)}>
                    Edit
                  </Button>
                  <Button color="danger" size="sm" onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {editingUser ? 'Edit User' : 'Create New User'}
        </ModalHeader>
        <Form onSubmit={editingUser ? handleUpdateUser : handleCreateUser}>
          <ModalBody>
            {error && <Alert color="danger">{error}</Alert>}
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                id="username"
                value={editingUser ? editingUser.username : newUser.username}
                onChange={(e) => editingUser 
                  ? setEditingUser({...editingUser, username: e.target.value})
                  : setNewUser({...newUser, username: e.target.value})
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={editingUser ? editingUser.email : newUser.email}
                onChange={(e) => editingUser
                  ? setEditingUser({...editingUser, email: e.target.value})
                  : setNewUser({...newUser, email: e.target.value})
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">
                Password {editingUser && <small>(Leave blank to keep current password)</small>}
              </Label>
              <Input
                type="password"
                id="password"
                value={editingUser ? editingUser.password : newUser.password}
                onChange={(e) => editingUser
                  ? setEditingUser({...editingUser, password: e.target.value})
                  : setNewUser({...newUser, password: e.target.value})
                }
                required={!editingUser}
              />
            </FormGroup>
            <FormGroup>
              <Label for="role">Role</Label>
              <Input
                type="select"
                id="role"
                value={editingUser ? editingUser.role : newUser.role}
                onChange={(e) => editingUser
                  ? setEditingUser({...editingUser, role: e.target.value})
                  : setNewUser({...newUser, role: e.target.value})
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              {editingUser ? 'Update' : 'Create'}
            </Button>
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  )
}

export default ManageUsers
