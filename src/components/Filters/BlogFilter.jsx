import React from 'react';
import { Row, Col, Input, Label, FormGroup } from 'reactstrap';
import '../../styles/filter.css';

const BlogFilter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters(prev => ({
      ...prev, 
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="filter__section">
      <Row>
        <Col lg="4" md="6">
          <FormGroup className="filter__group">
            <Label className="filter__label">Category</Label>
            <Input
              type="select"
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="filter__select"
            >
              <option value="">All Categories</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="culture">Culture</option>
              <option value="adventure">Adventure</option>
            </Input>
          </FormGroup>
        </Col>
        <Col lg="4" md="6">
          <FormGroup className="filter__group">
            <Label className="filter__label">Sort By</Label>
            <Input
              type="select"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleChange}
              className="filter__select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </Input>
          </FormGroup>
        </Col>
        <Col lg="4" md="12">
          <FormGroup className="filter__group">
            <Label className="filter__label">Search</Label>
            <Input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              className="filter__input"
              placeholder="Search blogs..."
            />
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};

export default BlogFilter;