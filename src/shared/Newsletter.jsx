import React from 'react'
import './newsletter.css'
import {Container, Row, Col} from 'reactstrap'
import maleTourist from './../assets/images/male-tourist.png'


const Newsletter = () => {
  return (
    <section className='newsletter'>
        <Container>
            <Row>
                <Col lg='6'>
                    <div className="newsletter__content">
                    <h2>Đăng ký nhận thông tin du lịch hữu ích</h2>

                        <div className="newsletter__input">
                            <input type="email" placeholder="Enter your email" />
                            <button className='btn newsletter__btn'>Subscribe</button>
                        </div>

                        
                        <p>
                            Đăng ký nhận thông tin để không bỏ lỡ những ưu đãi hấp dẫn và cập nhật những điểm đến mới nhất. Chúng tôi cam kết mang đến những trải nghiệm du lịch tuyệt vời nhất cho bạn.
                        </p>
                    </div>
                </Col>
                <Col lg='6'>
                    <div className="newsletter__img">
                        <img src={maleTourist} alt="" />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
} 

export default Newsletter
