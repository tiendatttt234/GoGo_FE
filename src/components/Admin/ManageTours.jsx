import React, { useState, useEffect, useContext } from 'react'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { BASE_URL } from '../../utils/config'
import { AuthContext } from '../../context/AuthContext'

const ManageTours = () => {
  const [tours, setTours] = useState([])
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editingTour, setEditingTour] = useState(null)
  const [newTour, setNewTour] = useState({
    title: '',
    city: '',
    address: '',
    distance: 0,
    price: 0,
    maxGroupSize: 0,
    description: '',
    photo: '',
    featured: false,
    gallery: []
  })
  const { user, token } = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTours, setFilteredTours] = useState([])

  useEffect(() => {
    if (token) {
      fetchTours()
    }
  }, [token])

  useEffect(() => {
    if (!tours) return
    const filtered = tours.filter(tour => 
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.city.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredTours(filtered)
  }, [searchTerm, tours])

  const fetchTours = async () => {
    setLoading(true)
    setError(null)
    try {
        const response = await fetch(`${BASE_URL}/tours`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch tours')
        }
        setTours(data.data || [])
        setFilteredTours(data.data || [])
    } catch (error) {
        console.error('Error fetching tours:', error)
        setError(error.message)
    } finally {
        setLoading(false)
    }
}

  const handleDeleteTour = async (tourId) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) {
        return
    }
    try {
        if (!token) {
            throw new Error('Authentication token is missing')
        }

        const response = await fetch(`${BASE_URL}/tours/${tourId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add token here
            },
            credentials: 'include'
        })

        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete tour')
        }

        alert('Tour deleted successfully')
        fetchTours()
    } catch (error) {
        console.error('Error deleting tour:', error)
        alert(error.message)
    }
}

  const handleCreateTour = async (e) => {
    e.preventDefault()
    try {
        if (!token) {
            throw new Error('Authentication token is missing')
        }

        const tourData = {
            ...newTour,
            distance: Number(newTour.distance),
            price: Number(newTour.price),
            maxGroupSize: Number(newTour.maxGroupSize)
        }
      
        const response = await fetch(`${BASE_URL}/tours`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add token here
            },
            credentials: 'include',
            body: JSON.stringify(tourData)
        })

        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || 'Failed to create tour')
        }

        setModal(false)
        alert('Tour created successfully')
        fetchTours()
        setNewTour({
            title: '',
            city: '',
            address: '',
            distance: 0,
            price: 0,
            maxGroupSize: 0,
            description: '',
            photo: '',
            featured: false,
            gallery: []
        })
    } catch (error) {
        console.error('Error creating tour:', error)
        alert(error.message)
    }
}

  const handleUpdateTour = async (e) => {
    e.preventDefault()
    try {
        if (!token) {
            throw new Error('Authentication token is missing')
        }

        const tourData = {
            ...editingTour,
            distance: Number(editingTour.distance),
            price: Number(editingTour.price),
            maxGroupSize: Number(editingTour.maxGroupSize)
        }

        const response = await fetch(`${BASE_URL}/tours/${editingTour._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add token here
            },
            credentials: 'include',
            body: JSON.stringify(tourData)
        })

        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update tour')
        }

        setModal(false)
        alert('Tour updated successfully')
        fetchTours()
        setEditingTour(null)
    } catch (error) {
        console.error('Error updating tour:', error)
        alert(error.message)
    }
}

  const handleToggleFeatured = async (tourId, featured) => {
    try {
      if (!token) {
        throw new Error('Authentication token is missing')
      }

      const response = await fetch(`${BASE_URL}/tours/${tourId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ featured })
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update tour featured status')
      }

      // Update local state to reflect the change
      setTours(tours.map(tour => 
        tour._id === tourId ? { ...tour, featured } : tour
      ))
      setFilteredTours(filteredTours.map(tour => 
        tour._id === tourId ? { ...tour, featured } : tour
      ))

      alert(`Tour ${featured ? 'added to' : 'removed from'} featured tours`)
    } catch (error) {
      console.error('Error updating tour featured status:', error)
      alert(error.message)
    }
  }

  const toggle = () => {
    setModal(!modal)
    setEditingTour(null)
    setNewTour({
      title: '',
      city: '',
      address: '',
      distance: 0,
      price: 0,
      maxGroupSize: 0,
      description: '',
      photo: '',
      featured: false,
      gallery: []
    })
  }

  const openEditModal = (tour) => {
    setEditingTour(tour)
    setModal(true)
  }

  if (!user || user.role !== 'admin') {
    return <Alert color="danger">Access denied. Admin privileges required.</Alert>
  }

  const renderForm = () => {
    const currentTour = editingTour || newTour
    return (
      <Form onSubmit={editingTour ? handleUpdateTour : handleCreateTour}>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={currentTour.title}
              onChange={(e) => editingTour 
                ? setEditingTour({ ...editingTour, title: e.target.value })
                : setNewTour({ ...newTour, title: e.target.value })
              }
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="text"
              id="city"
              value={currentTour.city}
              onChange={(e) => editingTour
                ? setEditingTour({ ...editingTour, city: e.target.value })
                : setNewTour({ ...newTour, city: e.target.value })
              }
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              id="address"
              value={currentTour.address}
              onChange={(e) => editingTour
                ? setEditingTour({ ...editingTour, address: e.target.value })
                : setNewTour({ ...newTour, address: e.target.value })
              }
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="distance">Distance</Label>
            <Input
              type="number"
              id="distance"
              value={currentTour.distance}
              onChange={(e) => editingTour
                ? setEditingTour({ ...editingTour, distance: e.target.value })
                : setNewTour({ ...newTour, distance: e.target.value })
              }
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="number"
              id="price"
              value={currentTour.price}
              onChange={(e) => editingTour
                ? setEditingTour({ ...editingTour, price: e.target.value })
                : setNewTour({ ...newTour, price: e.target.value })
              }
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="maxGroupSize">Max Group Size</Label>
            <Input
              type="number"
              id="maxGroupSize"
              value={currentTour.maxGroupSize}
              onChange={(e) => editingTour
                ? setEditingTour({ ...editingTour, maxGroupSize: e.target.value })
                : setNewTour({ ...newTour, maxGroupSize: e.target.value })
              }
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              id="description"
              value={currentTour.description}
              onChange={(e) => editingTour
                ? setEditingTour({ ...editingTour, description: e.target.value })
                : setNewTour({ ...newTour, description: e.target.value })
              }
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="photo">Photo URL</Label>
            <Input
              type="text"
              id="photo"
              value={currentTour.photo}
              onChange={(e) => editingTour
                ? setEditingTour({ ...editingTour, photo: e.target.value })
                : setNewTour({ ...newTour, photo: e.target.value })
              }
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="imageUrl">Gallery Image URL</Label>
            <Input
              type="text"
              id="imageUrl"
              placeholder="Enter image URL"
              onChange={(e) => editingTour
                ? setEditingTour({ ...editingTour, gallery: [...editingTour.gallery, e.target.value] })
                : setNewTour({ ...newTour, gallery: [...newTour.gallery, e.target.value] })
              }
            />
          </FormGroup>
          {currentTour.gallery && currentTour.gallery.length > 0 && (
            <div>
              <Label>Current Gallery Images:</Label>
              <div className="d-flex flex-wrap gap-2">
                {currentTour.gallery.map((url, index) => (
                  <div key={index} className="position-relative">
                    <img src={url} alt={`Gallery ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                    <Button
                      close
                      className="position-absolute top-0 end-0"
                      onClick={() => {
                        const newGallery = [...currentTour.gallery]
                        newGallery.splice(index, 1)
                        editingTour
                          ? setEditingTour({ ...editingTour, gallery: newGallery })
                          : setNewTour({ ...newTour, gallery: newGallery })
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            {editingTour ? 'Update Tour' : 'Create Tour'}
          </Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    )
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Tours</h2>
        <Button color="primary" onClick={toggle}>Add New Tour</Button>
      </div>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search tours by title or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <p>Loading tours...</p>}
      {error && <Alert color="danger">{error}</Alert>}

      {!loading && !error && (
        <Table responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>City</th>
              <th>Price</th>
              <th>Max Group</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTours.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  {searchTerm ? 'No tours found matching your search' : 'No tours available'}
                </td>
              </tr>
            ) : (
              filteredTours.map(tour => (
                <tr key={tour._id}>
                  <td>{tour.title}</td>
                  <td>{tour.city}</td>
                  <td>${tour.price}</td>
                  <td>{tour.maxGroupSize}</td>
                  <td>
                    <Input
                      type="checkbox"
                      checked={tour.featured}
                      onChange={() => handleToggleFeatured(tour._id, !tour.featured)}
                    />
                  </td>
                  <td>
                    <Button color="info" className="me-2" onClick={() => openEditModal(tour)}>
                      Edit
                    </Button>
                    <Button color="danger" onClick={() => handleDeleteTour(tour._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
      
      {/* Rest of the component (Modal, forms, etc.) stays the same */}
    </div>
  )
}

export default ManageTours
