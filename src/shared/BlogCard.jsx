import React from 'react'
import {Card, CardBody} from "reactstrap"
import {Link} from "react-router-dom"
import './blog-card.css'

const BlogCard = ({blog}) => {
    const {_id, title, photo, author, createdAt} = blog
    
    const date = new Date(createdAt).toLocaleDateString()

    return (
        <div className='blog__card'>
            <Card>
                <div className='blog__img'>
                    <img src={photo} alt="blog" />
                    {blog.featured && <span>Featured</span>}
                </div>

                <CardBody>
                    <div className='card__top d-flex align-items-center justify-content-between'>
                        <span className='blog__author'>
                            <i className="ri-user-line"></i> {author.username}
                        </span>
                        <span className='blog__date'>
                            <i className="ri-calendar-line"></i> {date}
                        </span>
                    </div>

                    <h5 className='blog__title'>
                        <Link to={`/blogs/${_id}`}>{title}</Link>
                    </h5>

                    <div className='card__bottom d-flex align-items-center justify-content-between mt-3'>
                        <button className='btn reading__btn'>
                            <Link to={`/blogs/${_id}`}>Read More</Link>
                        </button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default BlogCard