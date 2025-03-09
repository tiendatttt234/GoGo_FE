import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import Newsletter from '../shared/Newsletter'

const BlogDetails = () => {
    const { id } = useParams()
    const { data: blog, loading, error } = useFetch(`${BASE_URL}/blogs/${id}`)

    const { photo, title, content, author, createdAt } = blog?.data || {}

    return (
        <>
            <section>
                <Container>
                    {loading && <h4 className='text-center pt-5'>Loading....</h4>}
                    {error && <h4 className='text-center pt-5'>{error}</h4>}
                    {
                        !loading && !error && (
                            <Row>
                                <Col lg='8'>
                                    <div className="blog__content">
                                        <img src={photo} alt="" />
                                        <div className="blog__info">
                                            <h2>{title}</h2>
                                            <div className='d-flex align-items-center gap-5'>
                                                <span className='blog__author'>
                                                    <i className="ri-user-line"></i> {author?.username}
                                                </span>
                                                <span className='blog__date'>
                                                    <i className="ri-calendar-line"></i> 
                                                    {new Date(createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p>{content}</p>
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