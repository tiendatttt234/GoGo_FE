import React, { useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import Newsletter from '../shared/Newsletter'
import '../styles/blog-details.css'

const BlogDetails = () => {
    const { id } = useParams()
    const { data: blog, loading, error } = useFetch(`${BASE_URL}/blogs/${id}`)

    useEffect(() => {
        console.log('Blog data:', blog)
    }, [blog])

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