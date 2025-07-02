
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



export const ShippingScreen = () => {

  const cart=useSelector(state=>state.cart)
  const {shippingAddress}=cart

  const navigate=useNavigate()
  const dispatch=useDispatch()

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setpostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)



  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    navigate('/payment')
    console.log('submitted')
  } 

  return (
    
    <FormContainer>
      <CheckoutSteps step1 step2/>
    <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>

      <Form.Group controlId='address' style={{ margin: '1rem 0' }}>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                      type='text'
                      required
                      placeholder='Enter Address'
                      value={address ? address :''}
                      onChange={(e) => setAddress(e.target.value)}
                  >

                  </Form.Control>
              </Form.Group>
      
              <Form.Group controlId='city' style={{ margin: '1rem 0' }}>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                      type='text'
                      required
                      placeholder='Enter City'
                      value={city ? city :''}
                      onChange={(e) => setCity(e.target.value)}
                  >

                  </Form.Control>
              </Form.Group>
              
              <Form.Group controlId='postalCode' style={{ margin: '1rem 0' }}>
                  <Form.Label>postalCode</Form.Label>
                  <Form.Control
                      type='text'
                      required
                      placeholder='Enter postalCode'
                      value={postalCode ? postalCode :''}
                      onChange={(e) => setpostalCode(e.target.value)}
                  >

                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='country' style={{ margin: '1rem 0' }}>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                      type='text'
                      required
                      placeholder='Enter country'
                      value={country ? country :''}
                      onChange={(e) => setCountry(e.target.value)}
                  >

                  </Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary'>
                continue
            </Button>
      </Form>
    </FormContainer>
  )
}
