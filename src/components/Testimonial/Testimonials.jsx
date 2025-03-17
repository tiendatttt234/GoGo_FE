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
            <img src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/363357537_805005137737082_8967091106162098634_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=85PUYHGlQfoQ7kNvgH7mvaM&_nc_oc=AdgllAMWfN_e6wFcGT3XTwOXY1ODCWdDnBJr2VMJPr8ey574SVkfNETMv3ShKg7uYJY&_nc_zt=23&_nc_ht=scontent.fhan17-1.fna&_nc_gid=dp67dVKfKHcs2Lk_DGbIqg&oh=00_AYFrM_26zhl5_K3vh3UYz5DgTekBKzU1bWIWhdpIRnaFxw&oe=67DE1728" className='w-25 h-25 rounded-2' alt="" />
            <div>
                <h6 className='mb-0 mt-3'>Dương</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>
    <div className='testimonial py-4 px-3'>
        <p>
            "Đây là lần đầu tiên tôi đặt tour qua GoGo và thực sự rất hài lòng. Giá cả hợp lý, dịch vụ tốt, nhân viên thân thiện. Chắc chắn sẽ tiếp tục sử dụng dịch vụ của GoGo trong những chuyến đi tới."
        </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
            <img src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/484829991_1195217315465102_6964138826782926854_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=dT5rF4erUukQ7kNvgFI6yD_&_nc_oc=Adic2iRM2JVaHDqbPruy--EOPaXaU6mU3-6Xr4cRiOQAYfku3unFHd04BgGFbFmjIQI&_nc_zt=23&_nc_ht=scontent.fhan17-1.fna&_nc_gid=iQpPvtnm2Hr4MWwQnfF0Yw&oh=00_AYFZTNQTCsT3N2cwb0sYqCib4CvIATWfyhhO7eUra9paZA&oe=67DDF59B" className='w-25 h-25 rounded-2' alt="" />
            <div>
                <h6 className='mb-0 mt-3'> Huyền</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>
    <div className='testimonial py-4 px-3'>
        <p>
            "Tour được tổ chức rất chuyên nghiệp, từ việc đón khách đến lịch trình tham quan. Điểm đặc biệt là các địa điểm du lịch được chọn lọc rất kỹ, mang đến trải nghiệm văn hóa độc đáo."
        </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
            <img src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/473999260_2019916641861324_2917738575204154476_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=k00Cbq-8UAQQ7kNvgEA-htC&_nc_oc=Adj8RdVQwai6ds5Rdfvh8dcaj_h_GgjFj9Pi6OYeLUjLrRT_1hEU9aiml4BWuodJeh0&_nc_zt=24&_nc_ht=scontent.fhan17-1.fna&_nc_gid=JUILNT-0heEVuRNArZV5vw&oh=00_AYGnonoopk0x6YzikGr7_A-dBOoqD0MGMbcFEVViqRSpuA&oe=67DE2313" className='w-25 h-25 rounded-2' alt="" />
            <div>
                <h6 className='mb-0 mt-3'>Ngọc</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>
    <div className='testimonial py-4 px-3'>
        <p>
            "Chuyến du lịch tuyệt vời với dịch vụ chất lượng cao. Hướng dẫn viên nhiệt tình, chương trình tour được sắp xếp hợp lý. Tôi đặc biệt ấn tượng với cách họ chăm sóc từng chi tiết nhỏ nhất cho khách hàng."
        </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
            <img src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/482270002_2274958669572222_7262234203985467031_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=SePXg0UrRzoQ7kNvgEPDN6O&_nc_oc=AdiITKs84VWoTeYT-WXIxnbRVhEuTq4j46bGjLEGM26t41ObFIvqc1Pjg5KhKQiv5RY&_nc_zt=24&_nc_ht=scontent.fhan17-1.fna&_nc_gid=XwQwnRNdiLGATBbpzq-kSA&oh=00_AYFh9X-kGHxtIfO322ylZTMXawpEm7fHp853JhWSHY6SXQ&oe=67DE2412" className='w-25 h-25 rounded-2' alt="" />
            <div>
                <h6 className='mb-0 mt-3'>Hà</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>
    <div className='testimonial py-4 px-3'>
        <p>
            "Du lịch cùng GoGo là một trải nghiệm tuyệt vời. Tôi đã có những kỷ niệm đẹp và những bức ảnh đẹp từ những chuyến đi. Cảm ơn GoGo đã mang đến cho tôi những trải nghiệm tuyệt vời nhất."
        </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
            <img src="" className='w-25 h-25 rounded-2' alt="" />
            <div>
                <h6 className='mb-0 mt-3'>Đạt</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>
  </Slider>
);
};

export default Testimonials
