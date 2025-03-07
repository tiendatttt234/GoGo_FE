import { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/login.css"
import { AuthContext } from './../context/AuthContext'
import { BASE_URL } from './../utils/config'

import loginImg from "../assets/images/login.png"
import userIcon from "../assets/images/user.png"

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
    });

    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async e => {
        e.preventDefault()

        dispatch({type:'LOGIN_START'})

        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(credentials)
            })

            const result = await res.json()
            if(!res.ok) {
                dispatch({type:'LOGIN_FAILURE', payload: result.message})
                alert(result.message)
                return
            }

            console.log('Login response:', result) // Debug log

            // Structure the payload to match what AuthContext expects
            const payload = {
                user: {
                    ...result.data,
                    role: result.role
                },
                token: result.token
            }

            console.log('Dispatching payload:', payload) // Debug log

            dispatch({type:'LOGIN_SUCCESS', payload: payload})
            navigate('/')
        } catch(err) {
            dispatch({type:'LOGIN_FAILURE', payload: err.message})
            alert(err.message)
        }
    }

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='8' className='m-auto'>
                        <div className='login__container d-flex justify-content-between'>
                            <div className='login__img'>
                                <img src={loginImg} alt="" />
                            </div>
                            
                            <div className='login__form'>
                                <div className="user">
                                    <img src={userIcon} alt="" />
                                </div>
                                <h2>Login</h2>
                                
                                <Form onSubmit={handleClick}>
                                    <FormGroup>
                                        <input 
                                            type="email" 
                                            placeholder='Email' 
                                            required 
                                            id='email' 
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <input 
                                            type="password" 
                                            placeholder='Password' 
                                            required 
                                            id='password' 
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <Button 
                                        type='submit' 
                                        className='btn secondary__btn auth__btn'
                                    >
                                        Login
                                    </Button>
                                </Form>
                                <p>Don't have an account? <Link to='/register'>Create</Link></p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Login
