import React, { useRef } from 'react';
import { Col, Form, FormGroup } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './../utils/config';
import '../styles/search-bar.css';

const SearchBar = () => {
    const searchRef = useRef('');
    const navigate = useNavigate();

    const searchHandler = async () => {
        const searchTerm = searchRef.current.value;

        if (searchTerm.trim() === '') {
            return alert('Vui lòng nhập tên tour để tìm kiếm');
        }

        try {
            const res = await fetch(`${BASE_URL}/tours/search?title=${searchTerm}`);
            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || 'Something went wrong');
            }

            navigate(`/tours/search?title=${searchTerm}`, { 
                state: result.data 
            });

        } catch (err) {
            alert('Không tìm thấy tour. ' + err.message);
        }
    }

    return (
        <Col lg='12'>
            <div className='search__bar'>
                <Form className='d-flex align-items-center gap-4'>
                    <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                        <span>
                            <i className="ri-search-line"></i>
                        </span>
                        <div>
                            <h6>Tìm kiếm</h6>
                            <input 
                                type='text' 
                                placeholder='Nhập tên tour...' 
                                ref={searchRef}
                            />
                        </div>
                    </FormGroup>
                    <span className='search__icon' type='submit' onClick={searchHandler}>
                        <i className="ri-search-line"></i>
                    </span>   
                </Form>
            </div>
        </Col>
    );
};

export default SearchBar;
