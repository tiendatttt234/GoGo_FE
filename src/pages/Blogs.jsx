import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';
import BlogCard from '../shared/BlogCard';
import CommonSection from '../shared/CommonSection';
import Newsletter from '../shared/Newsletter';
import BlogFilter from '../components/Filters/BlogFilter';

const Blogs = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        sortBy: 'newest',
        search: ''
    });

    const blogsPerPage = 9; // 9 blogs per page

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}/blogs`);
                const result = await response.json();

                if (!result.success) {
                    throw new Error(result.message);
                }

                let filteredResults = [...result.data];

                // Apply search filter
                if (filters.search) {
                    filteredResults = filteredResults.filter(blog =>
                        blog.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                        blog.description.toLowerCase().includes(filters.search.toLowerCase())
                    );
                }

                // Apply sorting
                filteredResults.sort((a, b) => {
                    if (filters.sortBy === 'newest') {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    }
                    return new Date(a.createdAt) - new Date(b.createdAt);
                });

                setBlogs(filteredResults);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [filters]);

    // Calculate pagination
    const indexOfLastBlog = page * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    // Change page
    const paginate = (pageNumber) => {
        setPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <CommonSection title="Blogs" />
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
                        <BlogFilter filters={filters} setFilters={setFilters} />
                    </Row>
                    
                    <Row>
                        {loading && <h4 className='text-center pt-5'>Loading...</h4>}
                        {error && <h4 className='text-center pt-5'>{error}</h4>}
                        
                        {!loading && !error && currentBlogs.length > 0 ? (
                            currentBlogs.map(blog => (
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

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Row>
                            <Col lg='12'>
                                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                                    {[...Array(totalPages).keys()].map(number => (
                                        <span
                                            key={number + 1}
                                            onClick={() => paginate(number + 1)}
                                            className={`page__number ${page === number + 1 ? 'active__page' : ''}`}
                                        >
                                            {number + 1}
                                        </span>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>
            <Newsletter />
        </>
    );
};

export default Blogs;