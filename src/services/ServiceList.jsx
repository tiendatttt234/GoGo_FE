

import React from 'react';
import ServiceCard from './ServiceCard';
import {Col} from "reactstrap";

import weatherImg from './../assets/images/weather.png';
import guideImg from './../assets/images/guide.png';
import customizationImg from './../assets/images/customization.png';

const servicesData = [
    {
        imgUrl: weatherImg,
        title: 'Điểm đến',
        description: 'Những điểm đến tuyệt vời nhất trên thế giới mà bạn không thể bỏ lỡ.',
    },
    {
        imgUrl: guideImg,
        title: 'Reviews',
        description: 'Những đánh giá chất lượng từ những khách hàng hài lòng với dịch vụ của chúng tôi.',
    },
    {
        imgUrl: customizationImg,
        title: 'Blogs',
        description: 'Những bài viết hữu ích về du lịch, những trải nghiệm đáng nhớ và những lời khuyên hữu ích.',
    },
]

const ServiceList = () => {
  return (
    <>
    {
        servicesData.map((item, index) => (
            <Col lg="3" key={index}>
                <ServiceCard item={item}/>
            </Col>
        ))}
    </>
  );
};

export default ServiceList
