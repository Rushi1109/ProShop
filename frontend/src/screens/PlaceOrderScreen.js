import React, { useState, useEffect } from 'react'
import { Form, Butoon, Row, Col, Button, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from 'react-router-dom'
import { ordercreaterequest, ordercreatesuccess, ordercreatefail,ordercreatereset } from '../features/orderSlice'
import {cartClearItem} from '../features/cartSlice'
export const PlaceOrderScreen = () => {
    
    const orderCreate=useSelector(state=>state.orderCreate)
    const {order,error,success} =orderCreate


    const navigate=useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.userLogin)


    const itemPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    const shippingPrice = (itemPrice > 100 ? 0 : 10).toFixed(2)
    const taxPrice = ((0.082) * itemPrice).toFixed(2)
    const totalPrice = (Number(itemPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

    if(!cart.paymentMethod){
       
        navigate('/payment')
    }
    useEffect(()=>{
        if(success){
            navigate(`/order/${order._id}`)
            dispatch(ordercreatereset())
        }
    },[success,navigate])

    const createOrder = (order) => async () => {
        try {
            dispatch(ordercreaterequest())
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }

            }
            const { data } = await axios.post(`/api/orders/add/`, order, config)
            dispatch(ordercreatesuccess(data))
            dispatch(cartClearItem(data))

        } catch (error) {
            dispatch(ordercreatefail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message,
            ))
          
        }
    }

  
   

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:itemPrice,
            shippingPrice:shippingPrice,
            taxPrice:taxPrice,
            totalPrice:totalPrice

        }))
        // console.log('placeorder')
    }


    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address},{cart.shippingAddress.city}
                                {' '}
                                {cart.shippingAddress.postalCode}
                                {' '}
                                {cart.shippingAddress.country}


                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}


                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message variant='info'>
                                Your cart is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1} sm={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}



                        </ListGroup.Item>




                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summery</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>${itemPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    bsSize="large"
                                    className='btn-block'
                                    style={{ width: '100%' }}
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}
