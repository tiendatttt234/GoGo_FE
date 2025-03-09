import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/config'

const AddBlog = () => {
    const navigate = useNavigate()
    const [blogData, setBlogData] = useState({
        title: '',
        content: '',
        photo: '',
        featured: false
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
            const res = await fetch(`${BASE_URL}/blogs`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(blogData)
            })

            const result = await res.json()
            if (!res.ok) {
                throw new Error(result.message)
            }

            navigate('/blogs')
        } catch (err) {
            alert(err.message)
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