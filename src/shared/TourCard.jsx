import React from 'react'
import {Card, CardBody} from "reactstrap";
import {Link} from "react-router-dom";
import calculateAvgRating from '../utils/avgRating';

import './../shared/tour-card.css';

const TourCard = ({tour}) => {

    const {_id, title, city, photo, price, featured, reviews} = tour;

    const {totalRating, avgRating} = calculateAvgRating(reviews)

    // Format price to VND
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    }

  return (
    <div className='tour__card'>
      <Card>
        <div className='tour__img'>
            <img src={photo} alt="tour-img" />
            {featured && <span>Featured</span>}
        </div>

        <CardBody>
            <div className='card__top d-flex align-items-center justify-content-between'>
                <span className='tour__location d-flex  align-items-center gap-1'>
                    <i class="ri-map-pin-line"></i>{city}
                </span>
                <span className='tour__rating d-flex  align-items-center gap-1'>
                    <i class="ri-star-fill"></i>{avgRating === 0? null:avgRating}
                    {totalRating === 0? (
                        "Not rated"
                    ) : (
                      <span>({reviews.length}) </span>
                    )}
                </span>
            </div>

            <h5 className='tour__title'> 
                <Link to={`/tours/${_id}`}>
                    {title}
                </Link>
            </h5>

            <div className='card__bottom d-flex align-items-center justify-content-between mt-3'>
                <h5>
                    {formatPrice(price)} <span> /mỗi người</span>
                </h5>
            </div>

            <button className='btn booking__btn'>
                <Link to={`/tours/${_id}`}>Xem</Link>
            </button>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard
