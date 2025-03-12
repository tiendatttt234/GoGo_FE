import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';
import BlogCard from '../shared/BlogCard';
import CommonSection from '../shared/CommonSection';
import Newsletter from '../shared/Newsletter';
import BlogFilter from '../components/Filters/BlogFilter';

const Blogs = () => {
    const [filters, setFilters] = useState({
        sortBy: 'newest',
        search: ''
    });

    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const { data: blogs, loading, error } = useFetch(`${BASE_URL}/blogs`);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 9;

    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);

    // Get current blogs
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        if (!blogs) return;
        
        let result = [...blogs];

        // Apply search filter
        if (filters.search) {
            result = result.filter(blog =>
                blog.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                blog.description.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        // Apply sorting
        switch (filters.sortBy) {
            case 'newest':
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            default:
                break;
        }

        setFilteredBlogs(result);
    }, [blogs, filters]);

    useEffect(() => {
        const filteredResults = blogs?.filter(blog =>
            blog.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            blog.desc.toLowerCase().includes(filters.search.toLowerCase())
        );

        if (filteredResults) {
            // Sort blogs
            const sortedBlogs = [...filteredResults].sort((a, b) => {
                if (filters.sortBy === 'newest') {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                } else {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                }
            });

            setFilteredBlogs(sortedBlogs);
            setPageCount(Math.ceil(sortedBlogs.length / 8));
        }
    }, [blogs, filters]);

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
                    <Row>
                        <Col lg='12'>
                            <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                                {[...Array(totalPages).keys()].map(number => (
                                    <span
                                        key={number + 1}
                                        onClick={() => paginate(number + 1)}
                                        className={`page__number ${currentPage === number + 1 ? 'active__page' : ''}`}
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
    );
};

export default Blogs;