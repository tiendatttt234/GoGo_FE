import React, { useState, useContext } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';
import BlogCard from '../shared/BlogCard';
import CommonSection from '../shared/CommonSection';
import Newsletter from '../shared/Newsletter';

const Blogs = () => {
    const [page, setPage] = useState(0);
    const { data: blogs, loading, error } = useFetch(`${BASE_URL}/blogs`); // Remove page query initially
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    console.log('Blogs data:', blogs); // Debug log

    return (
        <>
            <CommonSection title="Our Blogs" />
            <section>
                <Container>
                    {user?.role === 'admin' && (
                        <Row className="mb-4">
                            <Col>
                                <Button 
                                    color="primary"
                                    onClick={() => navigate('/blogs/add')}
                                >
                                    Add New Blog
                                </Button>
                            </Col>
                        </Row>
                    )}
                    
                    <Row>
                        {loading && <h4 className='text-center pt-5'>Loading...</h4>}
                        {error && <h4 className='text-center pt-5'>{error}</h4>}
                        
                        {!loading && !error && blogs && blogs.length > 0 ? (
                            blogs.map(blog => (
                                <Col lg='4' md='6' sm='6' className='mb-4' key={blog._id}>
                                    <BlogCard blog={blog} />
                                </Col>
                            ))
                        ) : (
                            <Col lg='12'>
                                <h4 className='text-center'>No blogs found</h4>
                            </Col>
                        )}
                    </Row>
                </Container>
            </section>
            <Newsletter />
        </>
    );
};

export default Blogs;