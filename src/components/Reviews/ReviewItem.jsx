import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import avatar from '../../assets/images/avatar.jpg'

const ReviewItem = ({ review }) => {
    const { user } = useContext(AuthContext)
    const options = { day: 'numeric', month: 'long', year: 'numeric' }

    return (
        <div className="review__item mb-4">
            <div className="d-flex align-items-start gap-3">
                <img src={avatar} alt="" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
                <div className='w-100'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div>
                            <h6 className="mb-0">{review.username}</h6>
                            <p className="text-muted small mb-0">
                                {new Date(review.createdAt).toLocaleDateString("en-US", options)}
                            </p>
                        </div>
                        <span className="d-flex align-items-center">
                            {review.rating} <i className="ri-star-fill text-warning"></i>
                        </span>
                    </div>
                    <p className="mt-2 mb-2">{review.reviewText}</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewItem
