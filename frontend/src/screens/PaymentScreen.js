import React,{useState,useEffect} from 'react'
import {Form ,Butoon,Row,Col,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { userLoginSuccess } from '../features/userLoginSlice'
import { saveShippingAddress } from '../features/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../features/cartSlice'

const PaymentScreen = () => {
    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
  
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [paymentMethod,setPaymentMethod]=useState('Paypal')

    if(!shippingAddress.address){
        navigate('/shipping')
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>
                    Select Method
                </Form.Label>
                <Col>
                <Form.Check type='radio'
                            label='Paypal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e)=>setPaymentMethod(e.target.value)} 
                
                >

                </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
                continue
            </Button>

        </Form>
    </FormContainer>
  )
}

export default PaymentScreen