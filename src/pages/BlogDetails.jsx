import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import Newsletter from '../shared/Newsletter'
import '../styles/blog-details.css'

const BlogDetails = () => {
    const { id } = useParams()
    const { data: blog, loading, error } = useFetch(`${BASE_URL}/blogs/${id}`)

    // Debug log to check data structure
    console.log('Blog data:', blog)

    // Destructure from blog.data since that's how backend sends it
    const { photo, title, content, description, author, createdAt, category } = blog?.data || {}

    return (
        <>
            <section>
                <Container>
                    {loading && <h4 className='text-center pt-5'>Loading....</h4>}
                    {error && <h4 className='text-center pt-5'>{error}</h4>}
                    {
                        !loading && !error && blog?.data && (
                            <Row>
                                <Col lg='8' className='m-auto'>
                                    <div className="blog__details">
                                        <img src={photo} alt={title} className="w-100 mb-4" />
                                        <div className="blog__info">
                                            <h2>{title}</h2>
                                            <div className='d-flex align-items-center gap-5 mb-4'>
                                                <span className='blog__author'>
                                                    <i className="ri-user-line"></i> {author?.username || 'Unknown'}
                                                </span>
                                                <span className='blog__date'>
                                                    <i className="ri-calendar-line"></i> 
                                                    {new Date(createdAt).toLocaleDateString()}
                                                </span>
                                                <span className='blog__category'>
                                                    <i className="ri-folder-line"></i> {category}
                                                </span>
                                            </div>
                                            <p className="blog__description">{description}</p>
                                            <div className="blog__content">
                                                {content}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        )
                    }
                </Container>
            </section>
            <Newsletter />
        </>
    )
}

export default BlogDetails