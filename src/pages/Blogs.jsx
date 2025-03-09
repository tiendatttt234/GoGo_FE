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
    const { data: blogs, loading, error } = useFetch(`${BASE_URL}/blogs?page=${page}`);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

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
                        
                        {!loading && !error && blogs?.data?.map(blog => (
                            <Col lg='4' md='6' sm='6' className='mb-4' key={blog._id}>
                                <BlogCard blog={blog} />
                            </Col>
                        ))}
                        
                        {blogs?.total > (page + 1) * 8 && (
                            <Col lg='12'>
                                <div className="text-center mt-4">
                                    <Button 
                                        color="primary"
                                        onClick={() => setPage(prev => prev + 1)}
                                    >
                                        Load More
                                    </Button>
                                </div>
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