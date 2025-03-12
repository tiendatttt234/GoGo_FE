import React, { useState, useEffect } from 'react'
import CommonSection from '../shared/CommonSection'
import TourFilter from '../components/Filters/TourFilter'

import '../styles/tour.css'
import TourCard from './../shared/TourCard'
import SearchBar from './../shared/SearchBar'
import Newsletter from './../shared/Newsletter'
import { Container, Row, Col } from 'reactstrap'

import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'

const Tours = () => {
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        city: '',
        maxGroupSize: '',
        sortBy: ''
    });

    const [filteredTours, setFilteredTours] = useState([]);
    const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours`);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const toursPerPage = 12;

    // Get current tours
    const indexOfLastTour = currentPage * toursPerPage;
    const indexOfFirstTour = indexOfLastTour - toursPerPage;
    const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);
    const totalPages = Math.ceil(filteredTours.length / toursPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        if (!tours) return;
        
        let result = [...tours];

        // Apply filters
        if (filters.minPrice)
            result = result.filter(tour => tour.price >= filters.minPrice);
        if (filters.maxPrice)
            result = result.filter(tour => tour.price <= filters.maxPrice);
        if (filters.city)
            result = result.filter(tour => tour.city.toLowerCase().includes(filters.city.toLowerCase()));
        if (filters.maxGroupSize)
            result = result.filter(tour => tour.maxGroupSize <= filters.maxGroupSize);

        // Apply sorting
        if (filters.sortBy) {
            switch (filters.sortBy) {
                case 'price-asc':
                    result.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    result.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    result.sort((a, b) => b.avgRating - a.avgRating);
                    break;
                default:
                    break;
            }
        }

        setFilteredTours(result);
    }, [tours, filters]);

    return (
        <>
            <CommonSection title={"Địa điểm"} />
            <section>
                <Container>
                    <Row>
                        <SearchBar />
                    </Row>
                    <Row>
                        <TourFilter filters={filters} setFilters={setFilters} />
                    </Row>
                    <Row>
                        {loading && <h4 className='text-center pt-5'>Loading...</h4>}
                        {error && <h4 className='text-center pt-5'>{error}</h4>}
                        {!loading && !error && currentTours.map(tour => (
                            <Col lg='3' className='mb-4' key={tour._id}>
                                <TourCard tour={tour} />
                            </Col>
                        ))}
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

export default Tours
