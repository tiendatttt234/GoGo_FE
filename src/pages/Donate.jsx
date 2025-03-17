import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CommonSection from '../shared/CommonSection';
import donate from '../assets/images/donate.png';
const Donate = () => {
  return (
    <>
      <CommonSection title="Donate" />
      <section>
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              <div className="donate__wrapper text-center">
                <h2 className="mb-4">Hỗ trợ chúng tôi</h2>
                <p className="mb-4">
                  Cảm ơn bạn đã quan tâm đến việc hỗ trợ chúng tôi. 
                  Mọi đóng góp của bạn sẽ giúp chúng tôi phát triển và cung cấp dịch vụ tốt hơn.
                </p>
                <div className="donate__qr">
                  <img 
                    src={donate} 
                    alt="Donation QR Code"
                    className="donate__image"
                  />
                </div>
                <div className="donate__info mt-4">
                  <h5>Hoặc chuyển khoản trực tiếp</h5>
                  <p>Ngân hàng: Techcombank</p>
                  <p>Số tài khoản: 1903 6893 1160 15</p>
                  <p>Chủ tài khoản: DANG TUNG DUONG </p>
                  
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Donate;