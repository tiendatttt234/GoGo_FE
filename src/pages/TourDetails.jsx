import React, { useRef, useState, useEffect, useContext } from 'react'
import './../styles/tour-details.css'
import { Container, Row, Col, Form, ListGroup, Button, Input, Alert } from 'reactstrap'
import { useParams } from 'react-router-dom'
import calculateAvgRating from '../utils/avgRating'
import Newsletter from '../shared/Newsletter'
import useFetch from './../hooks/useFetch'
import { BASE_URL } from './../utils/config'
import { AuthContext } from './../context/AuthContext'
import ReviewItem from '../components/Reviews/ReviewItem'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const TourDetails = () => {
    const { id } = useParams()
    const reviewMsgRef = useRef('')
    const [tourRating, setTourRating] = useState(null)
    const [newImageUrl, setNewImageUrl] = useState('')
    const [error, setError] = useState(null)
    const { user, token } = useContext(AuthContext)
    const [reviewImages, setReviewImages] = useState([]);
    const [showImageSection, setShowImageSection] = useState(false);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                    slidesToShow: 1
                }
            }
        ]
    }

    const { 
        data: tour, 
        loading: tourLoading, 
        error: tourError,
        refetch: refetchTour
    } = useFetch(`${BASE_URL}/tours/${id}`)

    const {
        data: reviews,
        loading: reviewsLoading,
        error: reviewsError,
        refetch: refetchReviews
    } = useFetch(`${BASE_URL}/reviews/${id}`)

    useEffect(() => {
        console.log('Fetched tour data:', tour);
    }, [tour]);

    useEffect(() => {
        console.log('Fetched reviews data:', reviews);
    }, [reviews]);

    const { photo, title, description, price, address, city, distance, maxGroupSize } = tour || {}

    const { totalRating, avgRating } = calculateAvgRating(reviews || [])

    const submitHandler = async e => {
        e.preventDefault()
        const reviewText = reviewMsgRef.current.value

        try {
            if (!user || user === undefined || user === null) {
                alert('Please sign in')
                return
            }

            if (!tourRating) {
                alert('Please select a rating')
                return
            }

            const reviewObj = {
                reviewText,
                rating: tourRating,
                images: reviewImages
            }

            const res = await fetch(`${BASE_URL}/reviews/${id}`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify(reviewObj)
            })

            const result = await res.json()
            if (!res.ok) {
                return alert(result.message)
            }

            alert('Review submitted successfully')
            reviewMsgRef.current.value = ''
            setTourRating(null)
            setReviewImages([])
            refetchReviews()
        } catch (err) {
            alert(err.message)
        }
    }

    const handleAddImage = async (e) => {
        e.preventDefault()
        try {
            if (!token) {
                throw new Error('Authentication token is missing')
            }

            if (!newImageUrl.trim()) {
                throw new Error('Please enter an image URL')
            }

            const res = await fetch(`${BASE_URL}/tours/${id}/gallery`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ imageUrl: newImageUrl })
            })

            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.message || 'Failed to add image')
            }

            setNewImageUrl('')
            alert('Image added successfully')
            refetchTour()
        } catch (err) {
            console.error('Error adding image:', err)
            alert(err.message)
        }
    }

    const handleDeleteImage = async (imageIndex) => {
        if (!window.confirm('Are you sure you want to delete this image?')) {
            return
        }
        try {
            if (!token) {
                throw new Error('Authentication token is missing')
            }

            const res = await fetch(`${BASE_URL}/tours/${id}/gallery/${imageIndex}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            const result = await res.json()
            if (!res.ok) {
                throw new Error(result.message || 'Failed to delete image')
            }
            
            alert('Image deleted successfully')
            refetchTour()
        } catch (err) {
            console.error('Error deleting image:', err)
            alert(err.message)
        }
    }

    const addImageToReview = () => {
        if (!newImageUrl.trim()) {
            alert('Please enter an image URL');
            return;
        }
        setReviewImages([...reviewImages, newImageUrl]);
        setNewImageUrl('');
    };

    const removeImageFromReview = (index) => {
        setReviewImages(reviewImages.filter((_, i) => i !== index));
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [tour])

    if (tourLoading) {
        return <h4 className='text-center pt-5'>Loading...............</h4>
    }

    if (tourError) {
        return <h4 className='text-center pt-5'>{tourError}</h4>
    }

    return (
        <>
            <section>
                <Container>
                    <Row>
                        <Col lg='8'>
                            <div className="tour__content">
                                <img src={photo} alt="" />

                                <div className="tour__info">
                                    <h2>{title}</h2>
                                    <div className='d-flex align-items-center gap-5'>
                                        <span className='tour__rating d-flex align-items-center gap-1'>
                                            <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i>
                                            {avgRating === 0 ? null : avgRating}
                                            {totalRating === 0 ? (
                                                "Not rated"
                                            ) : (
                                                <span>({reviews?.length || 0})</span>
                                            )}
                                        </span>

                                        <span>
                                            <i className="ri-map-pin-line" style={{ color: "var(--secondary-color)" }}></i>
                                            {address}
                                        </span>
                                    </div>
                                    <div className="tour__extra-details">
                                        <span><i className="ri-map-pin-2-line" style={{ color: "var(--secondary-color)" }}></i>{city}</span>
                                        <span><i className="ri-money-dollar-circle-line" style={{ color: "var(--secondary-color)" }}></i>${price}/per person</span>
                                        <span><i className="ri-map-pin-time-line" style={{ color: "var(--secondary-color)" }}></i>{distance} k/m</span>
                                        <span><i className="ri-group-line" style={{ color: "var(--secondary-color)" }}></i>{maxGroupSize} people</span>
                                    </div>
                                    <h5>Description</h5>
                                    <p>{description}</p>
                                </div>

                                {/* Reviews Section */}
                                <div className="tour__reviews mt-4">
                                    <h4>Reviews ({reviews?.length || 0} reviews)</h4>

                                    <Form onSubmit={submitHandler}>
                                        <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <span key={star} onClick={() => setTourRating(star)}>
                                                    {star} <i className={`ri-star-${tourRating >= star ? 'fill' : 'line'}`}></i>
                                                </span>
                                            ))}
                                        </div>

                                        <div className="review__input">
                                            <input
                                                type="text"
                                                ref={reviewMsgRef}
                                                placeholder='Share your thoughts'
                                                required
                                            />
                                            <div className="review__actions d-flex align-items-center">
                                                <button 
                                                    type="button" 
                                                    className="image__button"
                                                    onClick={() => setShowImageSection(!showImageSection)}
                                                >
                                                    <i className="ri-image-add-line"></i>
                                                </button>
                                                <button className="btn primary__btn text-white" type='submit'>
                                                    Submit
                                                </button>
                                            </div>
                                        </div>

                                        {/* Image section that toggles */}
                                        {showImageSection && (
                                            <div className="review__images mt-3">
                                                <div className="d-flex gap-2 mb-2">
                                                    <Input
                                                        type="url"
                                                        placeholder="Add image URL"
                                                        value={newImageUrl}
                                                        onChange={(e) => setNewImageUrl(e.target.value)}
                                                    />
                                                    <Button 
                                                        color="secondary" 
                                                        type="button"
                                                        onClick={addImageToReview}
                                                    >
                                                        Add Image
                                                    </Button>
                                                </div>

                                                {reviewImages.length > 0 && (
                                                    <div className="review__image-preview mt-2">
                                                        {reviewImages.map((url, index) => (
                                                            <div key={index} className="position-relative d-inline-block me-2 mb-2">
                                                                <img 
                                                                    src={url} 
                                                                    alt={`Review image ${index + 1}`} 
                                                                    style={{
                                                                        width: '100px',
                                                                        height: '100px',
                                                                        objectFit: 'cover',
                                                                        borderRadius: '8px'
                                                                    }}
                                                                />
                                                                <Button
                                                                    color="danger"
                                                                    size="sm"
                                                                    className="position-absolute top-0 end-0"
                                                                    onClick={() => removeImageFromReview(index)}
                                                                >
                                                                    ×
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Form>

                                    <ListGroup className='user__reviews'>
                                        {reviewsLoading && <h5>Loading reviews...</h5>}
                                        {reviewsError && <h5>Error loading reviews: {reviewsError}</h5>}
                                        {!reviewsLoading && !reviewsError && reviews?.map(review => (
                                            <ReviewItem
                                                key={review._id}
                                                review={review}
                                                refetchReviews={refetchReviews}
                                            />
                                        ))}
                                    </ListGroup>
                                </div>
                            </div>
                        </Col>

                        <Col lg='4'>
                            <div className="tour__gallery">
                                <h5>Gallery</h5>
                                {tour && tour.gallery && tour.gallery.length > 0 ? (
                                    <div className="gallery__slider" style={{ height: '500px' }}>
                                        <Slider {...sliderSettings}>
                                            {tour.gallery.map((image, index) => (
                                                <div key={index} className="slider-item" style={{ height: '150px', padding: '5px', position: 'relative' }}>
                                                    <img 
                                                        src={image} 
                                                        alt={`Gallery image ${index + 1}`} 
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            borderRadius: '8px'
                                                        }}
                                                    />
                                                    {user && user.role === 'admin' && (
                                                        <Button 
                                                            color="danger" 
                                                            size="sm" 
                                                            style={{
                                                                position: 'absolute',
                                                                top: '10px',
                                                                right: '10px',
                                                                opacity: 0.7
                                                            }}
                                                            onClick={() => handleDeleteImage(index)}
                                                        >
                                                            X
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                ) : (
                                    <p>No images available</p>
                                )}
                                {user && user.role === 'admin' && (
                                    <Form onSubmit={handleAddImage} className="mt-3">
                                        <Input
                                            type="text"
                                            placeholder="Enter image URL"
                                            value={newImageUrl}
                                            onChange={(e) => setNewImageUrl(e.target.value)}
                                            required
                                        />
                                        <Button color="primary" type="submit" className="mt-2">
                                            Add Image
                                        </Button>
                                    </Form>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Newsletter />

            <style jsx>{`
                .gallery__slider {
                    background: #f7f7f7;
                    padding: 20px;
                    border-radius: 10px;
                }
                
                .slick-prev:before,
                .slick-next:before {
                    color: var(--secondary-color);
                }
                
                .slick-dots li button:before {
                    color: var(--secondary-color);
                }
                
                @media (max-width: 768px) {
                    .gallery__slider {
                        height: auto !important;
                    }
                    
                    .slider-item {
                        height: auto !important;
                    }
                }
            `}</style>
        </>
    )
}

export default TourDetails
