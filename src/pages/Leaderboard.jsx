import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Table } from 'reactstrap';
import '../styles/leaderboard.css';
import { BASE_URL } from '../utils/config';

const Leaderboard = () => {
    const [topReviewers, setTopReviewers] = useState([]);
    const [allReviewers, setAllReviewers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedReviewer, setSelectedReviewer] = useState(null);

    useEffect(() => {
        const fetchReviewers = async () => {
            try {
                const [topResponse, allResponse] = await Promise.all([
                    fetch(`${BASE_URL}/reviews/top-reviewers`),
                    fetch(`${BASE_URL}/reviews/all-reviewers`)
                ]);

                if (!topResponse.ok || !allResponse.ok) {
                    throw new Error('Failed to fetch reviewers');
                }

                const topData = await topResponse.json();
                const allData = await allResponse.json();

                setTopReviewers(topData.data);
                setAllReviewers(allData.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchReviewers();
    }, []);

    const getMedalColor = (index) => {
        switch(index) {
            case 0: return '#FFD700'; // Vàng
            case 1: return '#C0C0C0'; // Bạc
            case 2: return '#CD7F32'; // Đồng
            default: return '#6c757d'; // Xám
        }
    }

    const getMedalEmoji = (index) => {
        switch(index) {
            case 0: return '🥇';
            case 1: return '🥈';
            case 2: return '🥉';
            default: return '🏅';
        }
    }

    const getAchievementTitle = (reviewCount) => {
        if (reviewCount >= 50) return 'Người Đánh Giá Ưu Tú';
        if (reviewCount >= 30) return 'Người Đánh Giá Chuyên Nghiệp';
        if (reviewCount >= 20) return 'Người Đánh Giá Nhiều Kinh Nghiệm';
        if (reviewCount >= 10) return 'Người Đánh Giá Tích Cực';
        return 'Người Đánh Giá Mới';
    }

    return (
        <section className="leaderboard">
            <Container>
                <Row>
                    <Col lg="12">
                        <div className="leaderboard__header">
                            <h1 className="leaderboard__title">
                                <span className="trophy-emoji">🏆</span> 
                                Bảng Xếp Hạng Người Đánh Giá
                            </h1>
                            <p className="leaderboard__subtitle">
                                Vinh danh những thành viên tích cực nhất của cộng đồng
                            </p>
                        </div>
                    </Col>
                </Row>

                {loading && (
                    <div className="text-center loading-animation">
                        <div className="spinner-grow text-primary" role="status">
                            <span className="visually-hidden">Đang tải...</span>
                        </div>
                    </div>
                )}

                {error && (
                    <Alert color="danger" className="text-center">
                        <i className="ri-error-warning-line"></i> Lỗi: {error}
                        <br />
                        <small>Vui lòng tải lại trang hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp tục.</small>
                    </Alert>
                )}

                {!loading && !error && topReviewers && topReviewers.length === 0 && (
                    <Alert color="info" className="text-center">
                        Chưa có người đánh giá nào. Hãy là người đầu tiên đánh giá!
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
                                                    Đánh Giá
                                                </span>
                                            </div>
                                            <div className="stat__item">
                                                <span className="stat__value">
                                                    {reviewer.averageRating.toFixed(1)}
                                                    <i className="ri-star-fill star-icon"></i>
                                                </span>
                                                <span className="stat__label">
                                                    Điểm Trung Bình
                                                </span>
                                            </div>
                                        </div>
                                        <div className="reviewer__badge" 
                                            style={{backgroundColor: getMedalColor(index)}}>
                                            {index === 0 ? 'Người Đánh Giá Hàng Đầu' : `Hạng #${index + 1}`}
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
                            <p>Tiếp tục đánh giá để nâng hạng!</p>
                            <div className="achievement-levels">
                                <span className="achievement-item">
                                    50+ Đánh giá: Người Đánh Giá Ưu Tú 🌟
                                </span>
                                <span className="achievement-item">
                                    30+ Đánh giá: Người Đánh Giá Chuyên Nghiệp ⭐
                                </span>
                                <span className="achievement-item">
                                    20+ Đánh giá: Người Đánh Giá Nhiều Kinh Nghiệm 🎯
                                </span>
                                <span className="achievement-item">
                                    10+ Đánh giá: Người Đánh Giá Tích Cực 📝
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col lg="12">
                        <div className="all-reviewers">
                            <h3 className="text-center mb-4">Tất Cả Người Đánh Giá</h3>
                            <div className="table-responsive">
                                <Table hover className="reviewer-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên Người Dùng</th>
                                            <th>Số Lượng Đánh Giá</th>
                                            <th>Điểm Trung Bình</th>
                                            <th>Cấp Độ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allReviewers.map((reviewer, index) => (
                                            <tr key={reviewer._id}>
                                                <td>{index + 1}</td>
                                                <td>{reviewer._id}</td>
                                                <td>{reviewer.reviewCount}</td>
                                                <td>
                                                    {reviewer.averageRating.toFixed(1)}
                                                    <i className="ri-star-fill star-icon ms-1"></i>
                                                </td>
                                                <td>{getAchievementTitle(reviewer.reviewCount)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Leaderboard;
