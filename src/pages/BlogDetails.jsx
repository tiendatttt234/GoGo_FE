import React, { useEffect, useContext, useState } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/config'
import Newsletter from '../shared/Newsletter'
import { AuthContext } from '../context/AuthContext'
import '../styles/blog-details.css'

const BlogDetails = () => {
    const { id } = useParams()
    const { token, user } = useContext(AuthContext)
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`${BASE_URL}/blogs/${id}`);
                const result = await res.json();
                
                if (!result.success) {
                    throw new Error(result.message);
                }
                
                console.log('Fetched blog data:', result.data); // Log the fetched data
                setBlog(result.data);
            } catch (err) {
                console.error('Error fetching blog:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchBlog();
    }, [id]);

    return (
        <>
            <section>
                <Container>
                    {loading && <h4 className='text-center pt-5'>Loading....</h4>}
                    {error && <h4 className='text-center pt-5'>{error}</h4>}
                    {!loading && !error && blog && (
                        <Row>
                            <Col lg='8' className='m-auto'>
                                <div className="blog__details">
                                    <img src={blog.photo} alt={blog.title} className="w-100 mb-4" />
                                    <div className="blog__info">
                                        <h2>{blog.title}</h2>
                                        {user?.role === 'admin' && (
                                            <div className="blog__actions mb-4">
                                                <Button
                                                    color="primary"
                                                    onClick={() => navigate(`/blogs/edit/${id}`)}
                                                >
                                                    Edit Blog
                                                </Button>
                                            </div>
                                        )}
                                        <div className='d-flex align-items-center gap-5 mb-4'>
                                            <span className='blog__author'>
                                                <i className="ri-user-line"></i> {blog.author?.username || 'Unknown'}
                                            </span>
                                            <span className='blog__date'>
                                                <i className="ri-calendar-line"></i> 
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </span>
                                            <span className='blog__category'>
                                                <i className="ri-folder-line"></i> {blog.category}
                                            </span>
                                        </div>
                                        <p className="blog__description">{blog.description}</p>
                                        <div className="blog__content">
                                            {blog.content}
                                        </div>

                                        {/* Add links section */}
                                        {blog.links?.length > 0 && (
                                            <div className="blog__links">
                                                <h5 className="mb-3">Links:</h5>
                                                <div className="links__wrapper">
                                                    {blog.links.map((link, index) => (
                                                        <div key={index} className="blog__link-item">
                                                            <i className="ri-link"></i>
                                                            <a 
                                                                href={link.url} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                            >
                                                                {link.title}
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>
            <Newsletter />
        </>
    )
}

export default BlogDetails