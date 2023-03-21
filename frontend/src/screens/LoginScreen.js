import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import FormContainer from '../components/FormContainer';

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <FormContainer>
                <h1>Sign In</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password' className='my-2'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-3'>Sign In</Button>
                </Form>

                <Row className='py-2'>
                    <Col>
                        New Customer?
                        <Link className='px-2' to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register Here</Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default LoginScreen
