import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap'
import { BASE_URL } from '../../utils/config'
import avatar from '../../assets/images/avatar.jpg'

const ReviewItem = ({ review, refetchReviews }) => {
    const { user, token } = useContext(AuthContext)
    const [editModal, setEditModal] = useState(false)
    const [editedReview, setEditedReview] = useState({
        reviewText: review.reviewText,
        rating: review.rating,
        images: review.images || []
    })
    const [newImageUrl, setNewImageUrl] = useState('')
    
    const options = { day: 'numeric', month: 'long', year: 'numeric' }

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;

        try {
            const res = await fetch(`${BASE_URL}/reviews/${review._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            alert('Review deleted successfully');
            refetchReviews();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/reviews/${review._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify(editedReview)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            alert('Review updated successfully');
            setEditModal(false);
            refetchReviews();
        } catch (err) {
            alert(err.message);
        }
    };

    const addImage = () => {
        if (!newImageUrl.trim()) return;
        setEditedReview(prev => ({
            ...prev,
            images: [...prev.images, newImageUrl]
        }));
        setNewImageUrl('');
    };

    const removeImage = (index) => {
        setEditedReview(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

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
                        <div className="d-flex align-items-center gap-2">
                            <span className="d-flex align-items-center">
                                {review.rating} <i className="ri-star-fill text-warning"></i>
                            </span>
                            {(user && (user.id === review.userId || user.role === 'admin')) && (
                                <>
                                    <Button color="info" size="sm" onClick={() => setEditModal(true)}>
                                        <i className="ri-edit-line"></i>
                                    </Button>
                                    <Button color="danger" size="sm" onClick={handleDelete}>
                                        <i className="ri-delete-bin-line"></i>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                    <p className="mt-2 mb-2">{review.reviewText}</p>
                    
                    {/* Display review images */}
                    {review.images && review.images.length > 0 && (
                        <div className="review__images mt-2">
                            {review.images.map((url, index) => (
                                <img 
                                    key={index}
                                    src={url} 
                                    alt={`Review image ${index + 1}`}
                                    style={{
                                        width: '200px', // Increased from 100px
                                        height: '200px', // Increased from 100px
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        marginRight: '8px',
                                        marginBottom: '8px'
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            <Modal isOpen={editModal} toggle={() => setEditModal(!editModal)}>
                <ModalHeader toggle={() => setEditModal(!editModal)}>Edit Review</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleUpdate}>
                        <FormGroup>
                            <Label for="rating">Rating</Label>
                            <div className='d-flex gap-3'>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span 
                                        key={star} 
                                        onClick={() => setEditedReview(prev => ({...prev, rating: star}))}
                                        style={{cursor: 'pointer'}}
                                    >
                                        {star} <i className={`ri-star-${editedReview.rating >= star ? 'fill' : 'line'}`}></i>
                                    </span>
                                ))}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="reviewText">Review</Label>
                            <Input
                                type="textarea"
                                value={editedReview.reviewText}
                                onChange={(e) => setEditedReview(prev => ({...prev, reviewText: e.target.value}))}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Images</Label>
                            <div className="d-flex gap-2 mb-2">
                                <Input
                                    type="url"
                                    placeholder="Add image URL"
                                    value={newImageUrl}
                                    onChange={(e) => setNewImageUrl(e.target.value)}
                                />
                                <Button type="button" onClick={addImage}>Add</Button>
                            </div>
                            <div className="review__images">
                                {editedReview.images.map((url, index) => (
                                    <div key={index} className="position-relative d-inline-block me-2 mb-2">
                                        <img 
                                            src={url} 
                                            alt={`Review ${index + 1}`}
                                            style={{
                                                width: '200px', // Increased from 100px
                                                height: '200px', // Increased from 100px
                                                objectFit: 'cover',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <Button
                                            color="danger"
                                            size="sm"
                                            className="position-absolute top-0 end-0"
                                            onClick={() => removeImage(index)}
                                        >×</Button>
                                    </div>
                                ))}
                            </div>
                        </FormGroup>
                        <Button color="primary" type="submit">Update Review</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default ReviewItem;
