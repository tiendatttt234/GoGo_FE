import React from 'react'
import Slider from 'react-slick';
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'

const Testimonials = () => {

    const settings = {
        dots:true,
        infinite:true,
        autoplay:true,
        speed:1000,
        swipeToSlide:true,
        autoplaySpeed:2000,
        slidesToShow:3,
        
        responsive: [
            {
                breakpoint:992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                },
            },
            {
                breakpoint:576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ]
    }

  return (
  <Slider {...settings}>
    <div className='testimonial py-4 px-3'>
        <p>
            "Chuyến du lịch tuyệt vời với dịch vụ chất lượng cao. Hướng dẫn viên nhiệt tình, chương trình tour được sắp xếp hợp lý. Tôi đặc biệt ấn tượng với cách họ chăm sóc từng chi tiết nhỏ nhất cho khách hàng."
        </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava01} className='w-25 h-25 rounded-2' alt="" />
            <div>
                <h6 className='mb-0 mt-3'>John Doe</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>
    <div className='testimonial py-4 px-3'>
        <p>
            "Đây là lần đầu tiên tôi đặt tour qua GoGo và thực sự rất hài lòng. Giá cả hợp lý, dịch vụ tốt, nhân viên thân thiện. Chắc chắn sẽ tiếp tục sử dụng dịch vụ của GoGo trong những chuyến đi tới."
        </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava02} className='w-25 h-25 rounded-2' alt="" />
            <div>
                <h6 className='mb-0 mt-3'>Lia Franklin</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>
    <div className='testimonial py-4 px-3'>
        <p>
            "Tour được tổ chức rất chuyên nghiệp, từ việc đón khách đến lịch trình tham quan. Điểm đặc biệt là các địa điểm du lịch được chọn lọc rất kỹ, mang đến trải nghiệm văn hóa độc đáo."
        </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava03} className='w-25 h-25 rounded-2' alt="" />
            <div>
                <h6 className='mb-0 mt-3'>John Doe</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>
    <div className='testimonial py-4 px-3'>
        <p>
            "Chuyến du lịch tuyệt vời với dịch vụ chất lượng cao. Hướng dẫn viên nhiệt tình, chương trình tour được sắp xếp hợp lý. Tôi đặc biệt ấn tượng với cách họ chăm sóc từng chi tiết nhỏ nhất cho khách hàng."
        </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava02} className='w-25 h-25 rounded-2' alt="" />
            <div>
                <h6 className='mb-0 mt-3'>Lia Franklin</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>
  </Slider>
);
};

export default Testimonials
