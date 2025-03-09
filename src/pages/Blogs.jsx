import React, { useState, useEffect } from 'react'
import CommonSection from '../shared/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import BlogCard from '../shared/BlogCard'
import Newsletter from '../shared/Newsletter'
import { BASE_URL } from '../utils/config'
import useFetch from '../hooks/useFetch'

const Blogs = () => {
    const [pageCount, setPageCount] = useState(0)
    const [page, setPage] = useState(0)

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
                    </Row>
                </Container>
            </section>
            <Newsletter />
        </>
    )
}

export default Blogs