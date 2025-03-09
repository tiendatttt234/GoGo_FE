import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/config'

const AddBlog = () => {
    const navigate = useNavigate()
    const [blogData, setBlogData] = useState({
        title: '',
        description: '', // Add this
        content: '',
        photo: '',
        category: '', // Add this
        featured: false,
        tags: [] // Add this (optional)
    })

    const handleChange = e => {
        setBlogData(prev => ({
            ...prev,
            [e.target.id]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('You must be logged in as admin to create a blog')
            }

            const requiredFields = ['title', 'description', 'content', 'photo', 'category']
            for (const field of requiredFields) {
                if (!blogData[field]) {
                    throw new Error(`${field} is required`)
                }
            }

            const res = await fetch(`${BASE_URL}/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...blogData,
                    featured: blogData.featured || false,
                    tags: blogData.tags || []
                })
            })

            const result = await res.json()
            
            if (!result.success) {
                throw new Error(result.message)
            }

            alert('Blog created successfully!')
            navigate('/blogs')
        } catch (err) {
            console.error('Error creating blog:', err)
            alert(err.message || 'Failed to create blog. Please try again.')
        }
    }

    return (
        <section className='pt-0'>
            <Container>
                <Row>
                    <Col lg='8' className='m-auto'>
                        <div className="add__blog-container">
                            <h2 className='mb-4'>Create New Blog</h2>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input
                                        type="text"
                                        id="title"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input
                                        type="textarea"
                                        id="description"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="content">Content</Label>
                                    <Input
                                        type="textarea"
                                        id="content"
                                        style={{ height: '200px' }}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="photo">Photo URL</Label>
                                    <Input
                                        type="text"
                                        id="photo"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="category">Category</Label>
                                    <Input
                                        type="text"
                                        id="category"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            id="featured"
                                            onChange={handleChange}
                                        />{' '}
                                        Featured Blog
                                    </Label>
                                </FormGroup>
                                <Button color="primary" type="submit">
                                    Create Blog
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AddBlog