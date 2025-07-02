import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom"
import { Form, Butoon, Row, Col, Button, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
// import {PayPalButton } from 'react-paypal-button-v2'
import {PayPalScriptProvider,PayPalButtons }from '@paypal/react-paypal-js';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { orderdetailsrequest,orderdetailssuccess,orderdetailsfail} from '../features/orderDetailSlice'
import { orderpayrequest,orderpayssuccess,orderpayfail,orderpayreset} from '../features/orderPaySlice'
import {orderdeliverrequest,orderdeliverssuccess,orderdeliverfail,orderdeliverreset} from '../features/orderDeliverSlice'
const OrderScreena = ({match}) => {

    const {id}=useParams()
    const orderId=id
    
    const dispatch = useDispatch()
    
    const [sdkReady,setSdkReady] = useState(false)
   
    const { userInfo } = useSelector(state => state.userLogin)
 
    const navigate=useNavigate()


    const orderDetails=useSelector(state=>state.orderDetails)
    const {orderd,loading,error} = orderDetails

    const orderPay=useSelector(state=>state.orderPay)
    const {loading:loadingPay,success:successPay} = orderPay

    const orderDeliver=useSelector(state=>state.orderDeliver)
    const {loading:loadingDeliver,success:successDeliver} = orderDeliver
    // console.log(order)
    const neworderd= {...orderd,"itemPrice":'' }
    if(!loading && !error){
     

        neworderd.itemPrice=orderd.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
        
    }
    
    // const addPayPalScript = () => {
    //     const script = document.createElement('script')
    //     script.type = 'text/javascript'
    //     script.src = '<script src="https://www.paypal.com/sdk/js?client-id=Acyt09IdvmzqTDJv1eoJZxgPORGt07jfaviz1STdQvbsMbvmTrdkEFjLM5-OivIl2GIIrC-scqeFxsgE&currency=USD">'
    //     script.asyn = true
    //     script.onload = () =>{
    //         setSdkReady(true)
    //     }
    //     document.body.appendChild(script)
    // }
    
    // const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

    const getOrderDetails = (id) => async (dispatch, getState) => {
        try {
            dispatch(orderdetailsrequest())
            // const userInfo = getState().userLogin;
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }

            }
            const { data } = await axios.get(`/api/orders/${id}/`,config)
           
             dispatch(updateOrderDetails(data));
          

        } catch (error) {
            dispatch(orderdetailsfail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message,
            ))
          
        }
    }

    const updateOrderDetails = (orderDetails) => (dispatch) => {
        dispatch(orderdetailssuccess(orderDetails));
    };





    useEffect(()=>{

        if(!userInfo){
            navigate('/login')
        }
        if(!orderd || successPay || orderd._id !==  Number(id) || successDeliver ){
            dispatch(orderpayreset())
            dispatch(orderdeliverreset())
            dispatch(getOrderDetails(id))
            console.log("helloooo")
        }else if(!orderd.isPaid){
            setSdkReady(true)
            
        }

    },[dispatch,successPay,id,successDeliver,orderd])

    const createOrder=(data,action)=>{
        return action.order.create({
            purchase_units:[
                {
                    amount:{
                        currency_code:'USD',
                        value:`${orderd.totalPrice}`,
                    }
                }
            ]
        })
    }
    const onApprove=(paymentResult)=>{
        dispatch(payOrder(id,paymentResult))
    }

    const payOrder = (id,paymentResult) => async () => {
        try {
            dispatch(orderpayrequest())
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
      
            }
            const { data } = await axios.put(`/api/orders/${id}/pay/`, paymentResult, config)
            dispatch(orderpayssuccess(data))
            
      
        } catch (error) {
            dispatch(orderpayfail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message,
            ))
          
        }
      }

    const deliverHandler = () =>{
        dispatch(deliverOrder(orderd))
       

    }

    const deliverOrder = (order) => async () => {
        try {
            dispatch(orderdeliverrequest())
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
      
            }
            const { data } = await axios.put(`/api/orders/${orderd._id}/deliver/`, {}, config)
            dispatch(orderdeliverssuccess(data))
            
      
        } catch (error) {
            dispatch(orderdeliverfail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message,
            ))
          
        }
      }

  
   



    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ): (
        <div>
            <h1>Order: {orderd._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong>{orderd.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${orderd.user.email}`}>{orderd.user.email}</a></p>
                           
                            <p>
                                <strong>Shipping: </strong>
                                {orderd.shippingAddress.address},{orderd.shippingAddress.city}
                                {' '}
                                {orderd.shippingAddress.postalCode}
                                {' '}
                                {orderd.shippingAddress.country}


                            </p>
                            {orderd.isDelivered ? (
                                <Message variant='success'>Delivered On {orderd.deliveredAt}</Message>
                            ):(
                                <Message variant='warning'>Not Deliverd</Message>
                             
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {orderd.paymentMethod}


                            </p>
                            {orderd.isPaid ? (
                                <Message variant='success'>Paid On {orderd.paidAt}</Message>
                            ):(
                                <Message variant='warning'>Not Paid</Message>
                             
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {orderd.orderItems.length === 0 ? <Message variant='info'>
                                Order is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {orderd.orderItems.map((item, index) => (
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
                                    <Col>${neworderd.itemPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${orderd.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${orderd.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${orderd.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                                        
                             {!orderd.isPaid && (
                                
                                <ListGroup.Item>
                                        <PayPalScriptProvider options={{ clientId: "Acyt09IdvmzqTDJv1eoJZxgPORGt07jfaviz1STdQvbsMbvmTrdkEFjLM5-OivIl2GIIrC-scqeFxsgE" }}>
                                            <PayPalButtons createOrder={createOrder}
                                                            onApprove={onApprove}
                                                            // onClick={successPaymentHandler}
                                        />
                                        </PayPalScriptProvider>
                                       
                                    {/* {loadingPay && <Loader/>} */}
                                   
                                    {/* {!sdkReady ?(
                                        <Loader/>
                                    ):( 

                                    )} */}
                                </ListGroup.Item>
                            )}
                         
                        </ListGroup>
                        {loadingDeliver && <Loader/>}
                        {userInfo && userInfo.isAdmin && orderd.isPaid && !orderd.isDelivered && (
                            <ListGroup.Item style={{padding:'5px'}}>
                                <Button
                               bsSize="large"
                               className='btn-block'
                               style={{ width: '100%' }}
                                onClick={()=>deliverHandler()}
                                >Mark As Deliver</Button>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default OrderScreena