import React, { useState, useEffect } from 'react';
import '../styles/home.css';

import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import TourCard from '../shared/TourCard';
import calculateAvgRating from '../utils/avgRating';

import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import worldImg from '../assets/images/world.png';
import experienceImg from '../assets/images/experience.png';

import Subtitle from './../shared/Subtitle';

import SearchBar from './../shared/SearchBar';
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import FeaturedBlogList from '../components/Featured-blogs/FeaturedBlogList';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonial/Testimonials';
import Newsletter from '../shared/Newsletter';

const Home = () => {
  const [stats, setStats] = useState({
    totalTours: 0,
    totalUsers: 0,
    totalBlogs: 0,
    totalReviews: 0
  });
  const [mostReviewedTour, setMostReviewedTour] = useState(null);
  const [topReviewedTours, setTopReviewedTours] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [toursRes, usersRes, blogsRes, reviewsRes] = await Promise.all([
          fetch(`${BASE_URL}/tours`),
          fetch(`${BASE_URL}/users/count`),
          fetch(`${BASE_URL}/blogs/count`),
          fetch(`${BASE_URL}/reviews/count`)
        ]);

        const [toursData, usersData, blogsData, reviewsData] = await Promise.all([
          toursRes.json(),
          usersRes.json(),
          blogsRes.json(),
          reviewsRes.json()
        ]);

        // Sort tours by number of reviews and get top 3
        if (toursData.success && toursData.data) {
          const sortedTours = toursData.data
            .sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0))
            .slice(0, 3);
          setTopReviewedTours(sortedTours);
        }

        // Find the tour with most reviews
        if (toursData.success && toursData.data) {
          const mostReviewed = toursData.data.reduce((prev, current) => 
            (prev.reviews?.length > current.reviews?.length) ? prev : current
          );
          setMostReviewedTour(mostReviewed);
        }

        setStats({
          totalTours: toursData.data?.length || 0,
          totalUsers: usersData.data || 0,
          totalBlogs: blogsData.data || 0,
          totalReviews: reviewsData.data || 0
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      {/*WWWWWWWWWWWW HERO SECTION START WWWWWWWWWWWWWWWWWWW*/}
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className='hero__content'>
                <div className='hero__subtitle d-flex align-items-center'>
                  <Subtitle subtitle={'Thông tin cần biết'} />
                  <img src={worldImg} alt='' />
                </div>
                <h1>
                  Du lịch mở ra cánh cửa tạo nên{' '}
                  <span className='highlight'>kí ức</span>
                </h1>
                <p>
                  Hãy cùng chúng tôi khám phá những điểm đến mới lạ, trải nghiệm những cung đường đẹp nhất và tận hưởng những khoảnh khắc đáng nhớ trong cuộc đời.
                </p>
              </div>
            </Col>

            {topReviewedTours.map((tour, index) => (
              <Col lg='2' key={tour._id}>
                <div className={`hero__img-box ${index === 1 ? 'mt-4' : index === 2 ? 'mt-5' : ''}`}>
                  <Link to={`/tours/${tour._id}`}>
                    <img 
                      src={tour.photo} 
                      alt={tour.title}
                      style={{
                        width: '100%',
                        height: '350px',
                        objectFit: 'cover',
                        borderRadius: '20px',
                        border: 'solid 1px var(--secondary-color)',
                        cursor: 'pointer'
                      }}
                    />
                    
                  </Link>
                </div>
              </Col>
            ))}

            <SearchBar />
          </Row>
        </Container>
      </section>
      {/*WWWWWWWWWWWW HERO SECTION END WWWWWWWWWWWWWWWWWWW*/}
      <section>
        <Container>
          <Row>
            <Col lg='3'>
              <h5 className='services__subtitle'>Dịch vụ của chúng tôi</h5>
              <h2 className='services__title'>Chúng tôi cung cấp dịch vụ tốt nhất</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/*WWWWWWWWWWWW FEATURED TOUR SECTION START WWWWWWWWWWWWWWWWW */}
      <section>
        <Container>
          <Row>
            <Col lg='12' className='mb-5'>
              <Subtitle subtitle={"Explore"} />
              <h2 className='featured__tour-title'>Tour nổi bật</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/*WWWWWWWWWWWW FEATURED TOUR SECTION END WWWWWWWWWWWWWWWWW */}

      {/* Featured Blogs Section */}
      <section>
        <Container>
          <Row>
            <Col lg='12' className='mb-5'>
              <Subtitle subtitle={"Blogs"} />
              <h2 className='featured__tour-title'>Blog nổi bật</h2>
            </Col>
            <FeaturedBlogList />
          </Row>
        </Container>
      </section>

      {/*WWWWWWWWWWWW EXPERIENCE SECTION START WWWWWWWWWWWWWWWWW */}
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className="experience__content">
                <Subtitle subtitle={'Experience'} />
                <h2>Với tất cả reviews <br /> chúng tôi cho thấy</h2>
                <p>
                  Với những đánh giá chất lượng, chúng tôi tự tin đem đến những dịch vụ chất lượng cao và trải nghiệm đáng nhớ cho khách hàng.
                </p>

                <div className="counter__wrapper d-flex align-items-center gap-5">
                  <div className="counter__box">
                    <span>{stats.totalTours}</span>
                    <h6>Chuyến đi</h6>
                  </div>
                  <div className="counter__box">
                    <span>{stats.totalUsers}</span>
                    <h6>Khách hàng</h6>
                  </div>
                  <div className="counter__box">
                    <span>{stats.totalBlogs}</span>
                    <h6>Bài blogs</h6>
                  </div>
                  <div className="counter__box">
                    <span>{stats.totalReviews}</span>
                    <h6>Đánh giá</h6>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg='6'>
              {mostReviewedTour && (
                <div className="most-reviewed__tour">
                  <h5 className="mb-3">Tour được đánh giá nhiều nhất</h5>
                  <TourCard tour={mostReviewedTour} />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
      {/*WWWWWWWWWWWW EXPERIENCE SECTION END WWWWWWWWWWWWWWWWW */}

      {/*WWWWWWWWWWWW GALLERY SECTION START WWWWWWWWWWWWWWWWWWW*/}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Gallery'} />
              <h2 className='gallery__title'>Hãy khám phá cùng chúng tôi</h2>
            </Col>
            <Col lg='12'>
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/*WWWWWWWWWWWW GALLERY SECTION END   WWWWWWWWWWWWWWWWWWW*/}

      {/*WWWWWWWWWWWW TESTIMONIAL SECTION START WWWWWWWWWWWWWWWWWWW*/}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Fans Love'} />
              <h2 className='testimonial__title'>Các đồng Go nói gì về chúng tôi</h2>
            </Col>
            <Col lg='12'>
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
      {/*WWWWWWWWWWWW TESTIMONIAL SECTION END WWWWWWWWWWWWWWWWWWW*/}
      <Newsletter />
    </>
  );
};

export default Home;
