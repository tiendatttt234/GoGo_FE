import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/config'

const AddBlog = () => {
    const navigate = useNavigate()
    const [blogData, setBlogData] = useState({
        title: '',
        description: '',
        content: '',
        photo: '',
        video: '',
        category: '',
        featured: false,
        tags: [],
        links: []
    })
    const [newLink, setNewLink] = useState({ title: '', url: '' })
    const [linkError, setLinkError] = useState('')

    const handleChange = e => {
        setBlogData(prev => ({
            ...prev,
            [e.target.id]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }))
    }

    const validateUrl = (url) => {
        return /^(http|https):\/\/[^ "]+$/.test(url);
    }

    const validateVideoUrl = (url) => {
        if (!url) return true; // Allow empty video URL
        return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com|tiktok\.com)\/.+|^https?:\/\/.+\.(mp4|webm)$/.test(url);
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
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('You must be logged in as admin to create a blog');
            }

            // Create the complete blog data object
            const blogDataToSend = {
                title: blogData.title,
                description: blogData.description,
                content: blogData.content,
                photo: blogData.photo,
                video: blogData.video,
                category: blogData.category,
                featured: blogData.featured,
                tags: blogData.tags,
                links: blogData.links // Make sure links are included here
            };

            console.log('Sending blog data:', blogDataToSend); // Debug log

            const res = await fetch(`${BASE_URL}/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify(blogDataToSend)
            });

            const result = await res.json();
            
            if (!result.success) {
                throw new Error(result.message || 'Failed to create blog');
            }

            alert('Blog created successfully!');
            navigate('/blogs');
        } catch (err) {
            console.error('Error creating blog:', err);
            alert(err.message || 'Failed to create blog. Please try again.');
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
                                        placeholder="You can use markdown syntax. To add images: ![alt text](image_url)"
                                    />
                                    <small className="text-muted">
                                    Hỗ trợ markdown và hình ảnh. Ví dụ: ![Mô tả hình ảnh](https://example.com/image.jpg)
                                    </small>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="content">Content</Label>
                                    <Input
                                        type="textarea"
                                        id="content"
                                        style={{ height: '200px' }}
                                        onChange={handleChange}
                                        required
                                        placeholder="You can use markdown syntax. To add images: ![alt text](image_url)"
                                    />
                                    <small className="text-muted">
                                    Hỗ trợ markdown và hình ảnh. Ví dụ: ![Mô tả hình ảnh](https://example.com/image.jpg)
                                    </small>
                                    <small className="text-muted mt-2 d-block">
        Hỗ trợ định dạng văn bản:
        - Chữ in đậm: **text**
        - Tiêu đề lớn: # Text
        - Vừa lớn vừa đậm: # **Text**
        - Ví dụ: 
          # **Du lịch Đà Nẵng**
          ## **Địa điểm nổi bật**
    </small>
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
                                    <Label for="video">Video URL (Optional)</Label>
                                    <Input
                                        type="url"
                                        id="video"
                                        placeholder="YouTube, Vimeo, TikTok or direct video URL"
                                        value={blogData.video}
                                        onChange={handleChange}
                                    />
                                    <small className="text-muted">
                                        Supported: YouTube, Vimeo, TikTok, or direct video links
                                    </small>
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