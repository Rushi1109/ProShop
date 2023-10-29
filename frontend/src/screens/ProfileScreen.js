import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from '../redux/slices/userSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfpassword, setCnfPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetail = useSelector(state => state.userReducer.userLogin);
    const err = useSelector(state => state.userReducer.error);
    const status = useSelector(state => state.userReducer.status);

    useEffect(() => {
        if (!userDetail) {
            navigate('/login')
        }
        else {
            if (!userDetail.name) {
                dispatch(getUserDetails('profile'))
            }
            else {
                setName(userDetail.name);
                setEmail(userDetail.email);

            }
        }
    }, [navigate, dispatch, userDetail])

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== cnfpassword) {
            setMessage('Passwords do not match');
        }
        else {
            const user = {
                id: userDetail._id,
                name,
                email,
                password,
            }
            dispatch(updateUserProfile(user));
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {err && <Message variant='danger'>{err}</Message>}
                {status === 'successUpdate' && <Message variant='success'>Profile Updated</Message>}
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
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='cnfpassword' className='my-2'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm password' value={cnfpassword} onChange={(e) => setCnfPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-3'>Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen;
