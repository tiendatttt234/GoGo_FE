import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../utils/config'

const EditBlog = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [blogData, setBlogData] = useState({
        title: '',
        description: '',
        content: '',
        photo: '',
        category: '',
        featured: false,
        tags: [],
        links: []
    })
    const [newLink, setNewLink] = useState({ title: '', url: '' })
    const [linkError, setLinkError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`${BASE_URL}/blogs/${id}`)
                const result = await res.json()

                if (!result.success) {
                    throw new Error(result.message)
                }

                setBlogData(result.data)
                setLoading(false)
            } catch (err) {
                console.error('Error fetching blog:', err)
                alert(err.message)
                navigate('/blogs')
            }
        }

        fetchBlog()
    }, [id, navigate])

    const handleChange = e => {
        setBlogData(prev => ({
            ...prev,
            [e.target.id]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }))
    }

    const validateUrl = (url) => {
        return /^(http|https):\/\/[^ "]+$/.test(url)
    }

    const addLink = () => {
        setLinkError('')
        if (!newLink.title || !newLink.url) {
            setLinkError('Both title and URL are required')
            return
        }
        if (!validateUrl(newLink.url)) {
            setLinkError('Please enter a valid URL starting with http:// or https://')
            return
        }

        setBlogData(prev => ({
            ...prev,
            links: [...prev.links, newLink]
        }))
        setNewLink({ title: '', url: '' })
    }

    const removeLink = (index) => {
        setBlogData(prev => ({
            ...prev,
            links: prev.links.filter((_, i) => i !== index)
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('You must be logged in as admin to edit a blog')
            }

            const res = await fetch(`${BASE_URL}/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(blogData)
            })

            const result = await res.json()
            
            if (!result.success) {
                throw new Error(result.message)
            }

            alert('Blog updated successfully!')
            navigate(`/blogs/${id}`)
        } catch (err) {
            console.error('Error updating blog:', err)
            alert(err.message || 'Failed to update blog. Please try again.')
        }
    }

    if (loading) {
        return <h4 className='text-center pt-5'>Loading...</h4>
    }

    return (
        <section className='pt-0'>
            <Container>
                <Row>
                    <Col lg='8' className='m-auto'>
                        <div className="edit__blog-container">
                            <h2 className='mb-4'>Edit Blog</h2>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input
                                        type="text"
                                        id="title"
                                        value={blogData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input
                                        type="textarea"
                                        id="description"
                                        value={blogData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="content">Content</Label>
                                    <Input
                                        type="textarea"
                                        id="content"
                                        value={blogData.content}
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
                                        value={blogData.photo}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="video">Video URL (Optional)</Label>
                                    <Input
                                        type="url"
                                        id="video"
                                        placeholder="YouTube, Vimeo or direct video URL"
                                        value={blogData.video}
                                        onChange={handleChange}
                                    />
                                    <small className="text-muted">
                                        Supported: YouTube, Vimeo, or direct video links
                                    </small>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="category">Category</Label>
                                    <Input
                                        type="text"
                                        id="category"
                                        value={blogData.category}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Links</Label>
                                    <div className="d-flex gap-2 mb-2">
                                        <Input
                                            type="text"
                                            placeholder="Link Title"
                                            value={newLink.title}
                                            onChange={(e) => setNewLink(prev => ({...prev, title: e.target.value}))}
                                        />
                                        <Input
                                            type="url"
                                            placeholder="https://example.com"
                                            value={newLink.url}
                                            onChange={(e) => setNewLink(prev => ({...prev, url: e.target.value}))}
                                        />
                                        <Button color="secondary" onClick={addLink} type="button">
                                            Add Link
                                        </Button>
                                    </div>
                                    {linkError && <div className="text-danger mb-2">{linkError}</div>}
                                    
                                    {blogData.links.length > 0 && (
                                        <div className="mt-2">
                                            <Label>Added Links:</Label>
                                            {blogData.links.map((link, index) => (
                                                <div key={index} className="d-flex align-items-center gap-2 mb-1">
                                                    <span>{link.title}: </span>
                                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                        {link.url}
                                                    </a>
                                                    <Button 
                                                        color="danger" 
                                                        size="sm"
                                                        onClick={() => removeLink(index)}
                                                        type="button"
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            id="featured"
                                            checked={blogData.featured}
                                            onChange={handleChange}
                                        />{' '}
                                        Featured Blog
                                    </Label>
                                </FormGroup>
                                <Button color="primary" type="submit">
                                    Update Blog
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default EditBlog