import React from 'react';
import { Col } from 'reactstrap';
import BlogCard from '../../shared/BlogCard';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';

const FeaturedBlogList = () => {
  const { data: featuredBlogs, loading, error } = useFetch(
    `${BASE_URL}/blogs/featured`
  );

  return (
    <>
      {loading && <h4>Loading...</h4>}
      {error && <h4>{error}</h4>}
      {!loading && !error && featuredBlogs?.map(blog => (
        <Col lg="3" className='mb-4' key={blog._id}>
          <BlogCard blog={blog} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedBlogList;