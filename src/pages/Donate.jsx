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
              <div className="donate__wrapper">
                <div className="donate__content text-center">
                  <h2 className="mb-4">Đồng hành cùng chúng tôi phát triển nội dung du lịch!</h2>
                  <p className="mb-4">
                    Chúng tôi luôn nỗ lực mang đến cho bạn những thông tin du lịch hữu ích, nhanh gọn và chính xác nhất. 
                    Nếu bạn thấy nội dung của chúng tôi hữu ích, hãy ủng hộ để giúp chúng tôi tiếp tục chia sẻ những kinh nghiệm quý giá này đến nhiều người hơn nữa.
                  </p>
                  <p className="donate__highlight mb-4">
                    ❤️ Quét mã hoặc chuyển khoản để ủng hộ ngay! ❤️
                  </p>
                  <p className="mb-4">
                    Mọi đóng góp của bạn đều là động lực để chúng tôi tiếp tục hành trình này. Cảm ơn bạn rất nhiều! 🙏
                  </p>
                </div>
                <div className="donate__qr d-flex justify-content-center">
                  <img 
                    src={donate} 
                    alt="Donation QR Code"
                    className="donate__image"
                  />
                </div>
                <div className="donate__info mt-4 text-center">
                  <h5 className="mb-3">Hoặc chuyển khoản trực tiếp</h5>
                  <div className="bank-info">
                    <p className="mb-2">Ngân hàng: Techcombank</p>
                    <p className="mb-2">Số tài khoản: 1903 6893 1160 15</p>
                    <p className="mb-2">Chủ tài khoản: DANG TUNG DUONG</p>
                  </div>
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