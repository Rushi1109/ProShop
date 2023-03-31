import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from "react-redux";
import { register } from '../redux/slices/userSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';

const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfpassword, setCnfPassword] = useState('');
    const [message, setMessage] = useState(null);

    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userReducer.userLogin);
    const err = useSelector(state => state.userReducer.error);
    const status = useSelector(state => state.userReducer.status);

    useEffect(() => {
        if (userLogin) {

        }
    }, [userLogin, redirect])

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== cnfpassword) {
            setMessage('Passwords do not match');
        }
        else {
            setMessage('');
            const args = {
                name,
                email,
                password
            }

            dispatch(register(args));
        }
    }

    return (
        <>
            <FormContainer>
                <h1>Sign Up</h1>
                {message && <Message variant='danger'>{message}</Message>}
                {err && <Message variant='danger'>{err}</Message>}
                {status === 'loading' ? <Loader /> : <></>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} required></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} required></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password' className='my-2'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} required></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='cnfpassword' className='my-2'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm password' value={cnfpassword} onChange={(e) => setCnfPassword(e.target.value)} required></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-3'>Register</Button>
                </Form>

                <Row className='py-2'>
                    <Col>
                        Have an account?
                        <Link className='px-2' to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default RegisterScreen;
