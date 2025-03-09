import React, { useState, useEffect } from 'react'
import CommonSection from '../shared/CommonSection'
import { Container, Row, Col, Button } from 'reactstrap'
import BlogCard from '../shared/BlogCard'
import Newsletter from '../shared/Newsletter'
import { BASE_URL } from '../utils/config'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'

const Blogs = () => {
    const [pageCount, setPageCount] = useState(0)
    const [page, setPage] = useState(0)
    const navigate = useNavigate()

    const { 
        data: blogs, 
        loading, 
        error 
    } = useFetch(`${BASE_URL}/blogs?page=${page}`)

    useEffect(() => {
        if (blogs?.totalPages) {
            setPageCount(blogs.totalPages)
        }
    }, [blogs])

    const handleCreateBlog = () => {
        navigate('/add-blog')
        console.log('Navigating to add blog page')
    }

    const user = {
        role: 'admin' // Example user role, replace with actual user role logic
    }

    return (
        <>
            <CommonSection title={"All Blogs"} />
            <section>
                <Container>
                    <Row>
                        {loading && <h4 className='text-center pt-5'>Loading....</h4>}
                        {error && <h4 className='text-center pt-5'>{error}</h4>}
                        {
                            !loading && !error &&
                            blogs?.data?.map(blog => (
                                <Col lg='3' md='6' sm='6' className='mb-4' key={blog._id}>
                                    <BlogCard blog={blog} />
                                </Col>
                            ))
                        }

                        <Col lg='12'>
                            <div className="pagination d-flex align-items-center 
                                justify-content-center mt-4 gap-3">
                                {[...Array(pageCount || 0).keys()].map(number => (
                                    <span
                                        key={number}
                                        onClick={() => setPage(number)}
                                        className={page === number ? 'active__page' : ''}
                                    >
                                        {number + 1}
                                    </span>
                                ))}
                            </div>
                        </Col>

                        <Col lg='12' className='text-center mt-4'>
                            {user?.role === 'admin' && (
                                <Button onClick={handleCreateBlog} className="btn primary__btn">
                                    Add New Blog
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>
            <Newsletter />
        </>
    )
}

export default Blogs