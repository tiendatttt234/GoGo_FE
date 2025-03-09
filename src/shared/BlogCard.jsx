import React from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import './blog-card.css';

const BlogCard = ({ blog }) => {
    const { _id, title, description, photo, author, createdAt } = blog;

    return (
        <Card className='blog__card'>
            <CardImg top src={photo} alt={title} />
            <CardBody>
                <div className="blog__info">
                    <span className="blog__author">
                        <i className="ri-user-line"></i> {author.username}
                    </span>
                    <span className="blog__date">
                        <i className="ri-calendar-line"></i> 
                        {new Date(createdAt).toLocaleDateString()}
                    </span>
                </div>
                <CardTitle tag="h5">{title}</CardTitle>
                <CardText>{description.substring(0, 100)}...</CardText>
                <Link to={`/blogs/${_id}`} className="btn blog__btn">
                    Read More
                </Link>
            </CardBody>
        </Card>
    );
};

export default BlogCard;