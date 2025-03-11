import React, { useEffect, useContext, useState } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BASE_URL } from '../utils/config'
import Newsletter from '../shared/Newsletter'
import { AuthContext } from '../context/AuthContext'
import '../styles/blog-details.css'

const BlogDetails = () => {
    const { id } = useParams()
    const { token, user } = useContext(AuthContext)
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`${BASE_URL}/blogs/${id}`);
                const result = await res.json();
                
                if (!result.success) {
                    throw new Error(result.message);
                }
                
                console.log('Fetched blog data:', result.data); // Log the fetched data
                setBlog(result.data);
            } catch (err) {
                console.error('Error fetching blog:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchBlog();
    }, [id]);

    const renderVideo = (videoUrl) => {
        if (!videoUrl) return null;
    
        if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
            const videoId = videoUrl.includes('youtube.com') 
                ? videoUrl.split('v=')[1]
                : videoUrl.split('youtu.be/')[1];
            return (
                <div className="blog__video mb-4">
                    <iframe
                        width="100%"
                        height="400"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            );
        } else if (videoUrl.includes('vimeo.com')) {
            const videoId = videoUrl.split('vimeo.com/')[1];
            return (
                <div className="blog__video mb-4">
                    <iframe
                        width="100%"
                        height="400"
                        src={`https://player.vimeo.com/video/${videoId}`}
                        title="Vimeo video player"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            );
        } else if (videoUrl.includes('tiktok.com')) {
            // Extract video ID from TikTok URL
            const videoId = videoUrl.split('/video/')[1]?.split('?')[0];
            return (
                <div className="blog__video mb-4">
                    <iframe
                        width="100%"
                        height="600"
                        src={`https://www.tiktok.com/embed/${videoId}`}
                        title="TikTok video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            );
        } else {
            return (
                <div className="blog__video mb-4">
                    <video
                        controls
                        width="100%"
                        height="400"
                    >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            );
        }
    }

    return (
        <>
            <section>
                <Container>
                    {loading && <h4 className='text-center pt-5'>Loading....</h4>}
                    {error && <h4 className='text-center pt-5'>{error}</h4>}
                    {!loading && !error && blog && (
                        <Row>
                            <Col lg='8' className='m-auto'>
                                <div className="blog__details">
                                    <img src={blog.photo} alt={blog.title} className="w-100 mb-4" />
                                    <div className="blog__info">
                                        <h2>{blog.title}</h2>
                                        {user?.role === 'admin' && (
                                            <div className="blog__actions mb-4">
                                                <Button
                                                    color="primary"
                                                    onClick={() => navigate(`/blogs/edit/${id}`)}
                                                >
                                                    Edit Blog
                                                </Button>
                                            </div>
                                        )}
                                        <div className='d-flex align-items-center gap-5 mb-4'>
                                            <span className='blog__author'>
                                                <i className="ri-user-line"></i> {blog.author?.username || 'Unknown'}
                                            </span>
                                            <span className='blog__date'>
                                                <i className="ri-calendar-line"></i> 
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </span>
                                            <span className='blog__category'>
                                                <i className="ri-folder-line"></i> {blog.category}
                                            </span>
                                        </div>

                                        {/* Links section */}
                                        {blog.links?.length > 0 && (
                                            <div className="blog__links mb-4">
                                                <h5 className="mb-3">Links:</h5>
                                                <div className="links__wrapper">
                                                    {blog.links.map((link, index) => (
                                                        <div key={index} className="blog__link-item">
                                                            <i className="ri-link"></i>
                                                            <a 
                                                                href={link.url} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                            >
                                                                {link.title}
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Video section - moved here */}
                                        {blog.video && renderVideo(blog.video)}

                                        {/* Description and content */}
                                        <div className="blog__content">
                                            <ReactMarkdown 
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    img: ({node, ...props}) => (
                                                        <img 
                                                            style={{maxWidth: '100%', height: 'auto', margin: '1rem 0'}} 
                                                            {...props} 
                                                            alt={props.alt || ''} 
                                                        />
                                                    )
                                                }}
                                            >
                                                {blog.description}
                                            </ReactMarkdown>
                                            <ReactMarkdown 
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    img: ({node, ...props}) => (
                                                        <img 
                                                            style={{maxWidth: '100%', height: 'auto', margin: '1rem 0'}} 
                                                            {...props} 
                                                            alt={props.alt || ''} 
                                                        />
                                                    )
                                                }}
                                            >
                                                {blog.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>
            <Newsletter />
        </>
    )
}

export default BlogDetails