import React, { useState } from 'react'
import { Container, Row, Col, Card, Alert } from 'reactstrap'
import { BASE_URL } from '../utils/config'
import useFetch from '../hooks/useFetch'
import '../styles/leaderboard.css'

const Leaderboard = () => {
    const { data: topReviewers, loading, error } = useFetch(`${BASE_URL}/reviews/top-reviewers`)
    const [selectedReviewer, setSelectedReviewer] = useState(null)

    const getMedalColor = (index) => {
        switch(index) {
            case 0: return '#FFD700'; // Gold
            case 1: return '#C0C0C0'; // Silver
            case 2: return '#CD7F32'; // Bronze
            default: return '#28a745'; // Green for others
        }
    }

    const getMedalEmoji = (index) => {
        switch(index) {
            case 0: return '👑';
            case 1: return '🥈';
            case 2: return '🥉';
            default: return '🏅';
        }
    }

    const getAchievementTitle = (reviewCount) => {
        if (reviewCount >= 50) return 'Elite Reviewer';
        if (reviewCount >= 30) return 'Expert Reviewer';
        if (reviewCount >= 20) return 'Experienced Reviewer';
        if (reviewCount >= 10) return 'Active Reviewer';
        return 'Rising Reviewer';
    }

    return (
        <section className="leaderboard">
            <Container>
                <Row>
                    <Col lg="12">
                        <div className="leaderboard__header">
                            <h1 className="leaderboard__title">
                                <span className="trophy-emoji">🏆</span> 
                                Top Reviewers
                            </h1>
                            <p className="leaderboard__subtitle">
                                Celebrating our most active community members
                            </p>
                        </div>
                    </Col>
                </Row>

                {loading && (
                    <div className="text-center loading-animation">
                        <div className="spinner-grow text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                {error && (
                    <Alert color="danger" className="text-center">
                        <i className="ri-error-warning-line"></i> Error: {error}
                        <br />
                        <small>Please try refreshing the page or contact support if the problem persists.</small>
                    </Alert>
                )}

                {!loading && !error && topReviewers && topReviewers.length === 0 && (
                    <Alert color="info" className="text-center">
                        No reviewers found. Be the first to leave a review!
                    </Alert>
                )}

                {!loading && !error && topReviewers && topReviewers.length > 0 && (
                    <Row className="gy-4 justify-content-center">
                        {topReviewers.map((reviewer, index) => (
                            <Col key={reviewer._id} lg="4" md="6" 
                                className="leaderboard__card-wrapper"
                                onMouseEnter={() => setSelectedReviewer(reviewer._id)}
                                onMouseLeave={() => setSelectedReviewer(null)}
                            >
                                <Card className={`leaderboard__card leaderboard__position--${index + 1} ${selectedReviewer === reviewer._id ? 'card-hover' : ''}`}>
                                    <div className="leaderboard__medal" 
                                        style={{backgroundColor: getMedalColor(index)}}>
                                        <span className="medal__emoji">{getMedalEmoji(index)}</span>
                                    </div>
                                    <div className="leaderboard__content">
                                        <h3 className="reviewer__name">
                                            {reviewer._id}
                                            {index === 0 && <span className="crown-emoji">👑</span>}
                                        </h3>
                                        <div className="reviewer__achievement">
                                            {getAchievementTitle(reviewer.reviewCount)}
                                        </div>
                                        <div className="reviewer__stats">
                                            <div className="stat__item">
                                                <span className="stat__value">
                                                    {reviewer.reviewCount}
                                                </span>
                                                <span className="stat__label">
                                                    Reviews
                                                </span>
                                            </div>
                                            <div className="stat__item">
                                                <span className="stat__value">
                                                    {reviewer.averageRating.toFixed(1)}
                                                    <i className="ri-star-fill star-icon"></i>
                                                </span>
                                                <span className="stat__label">
                                                    Avg Rating
                                                </span>
                                            </div>
                                        </div>
                                        <div className="reviewer__badge" 
                                            style={{backgroundColor: getMedalColor(index)}}>
                                            {index === 0 ? 'Top Reviewer' : `#${index + 1} Reviewer`}
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}

                <Row className="mt-5">
                    <Col lg="12">
                        <div className="leaderboard__info text-center">
                            <p>Keep reviewing to climb the leaderboard!</p>
                            <div className="achievement-levels">
                                <span className="achievement-item">
                                    50+ Reviews: Elite Reviewer 🌟
                                </span>
                                <span className="achievement-item">
                                    30+ Reviews: Expert Reviewer ⭐
                                </span>
                                <span className="achievement-item">
                                    20+ Reviews: Experienced Reviewer 🎯
                                </span>
                                <span className="achievement-item">
                                    10+ Reviews: Active Reviewer 📝
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Leaderboard
