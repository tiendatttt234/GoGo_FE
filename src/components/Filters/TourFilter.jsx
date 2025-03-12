import React from 'react';
import { Row, Col, Input, Label, FormGroup } from 'reactstrap';
import '../../styles/filter.css';
const TourFilter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="filter__section">
      <Row>
        <Col lg="3" md="6">
          <FormGroup className="filter__group">
            <Label className="filter__label">Min Price</Label>
            <Input
              type="number" 
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              className="filter__input"
            />
          </FormGroup>
        </Col>
        <Col lg="3" md="6">
          <FormGroup className="filter__group">
            <Label className="filter__label">Max Price</Label>
            <Input
              type="number"
              name="maxPrice" 
              value={filters.maxPrice}
              onChange={handleChange}
              className="filter__input"
            />
          </FormGroup>
        </Col>
        <Col lg="3" md="6">
          <FormGroup className="filter__group">
            <Label className="filter__label">City</Label>
            <Input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleChange}
              className="filter__input"
              placeholder="Enter city name"
            />
          </FormGroup>
        </Col>
        <Col lg="3" md="6">
          <FormGroup className="filter__group">
            <Label className="filter__label">Sort By</Label>
            <Input
              type="select"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleChange}
              className="filter__select"
            >
              <option value="">Select</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="rating">Rating</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};

export default TourFilter;