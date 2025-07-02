import React,{useState,useEffect} from 'react'
import {Link, redirect} from 'react-router-dom'
import {Form ,Butoon,Row,Col,Button,Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { userDetailStart,userDetailSuccess,userDetailFail } from '../features/userDetailSlice'
import {updateProfileStart,updateProfileSuccess, updateProfileFail, updateProfileReset} from '../features/userUpdateSlice'
import FormContainer from '../components/FormContainer'
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { userLoginSuccess } from '../features/userLoginSlice'
import { orderListrequest,orderListssuccess,orderListfail,orderListreset } from '../features/orderListSlice'

const ProfileScreen = () => {
    const [name,setName]=useState('')
    const [variant,setVariant]=useState(0);
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmpassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState('')

    let location = useLocation();
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const redirect=location.search ? location.search.split('=')[1]:'/'

    const userDetails=useSelector(state=>state.userDetail)
    const {user,loading,error}=userDetails
    
    const {userInfo}=useSelector(state=>state.userLogin)
    
    const userUpdateProfile=useSelector(state=>state.userUpdateProfile)
    const {success}=userUpdateProfile

    const orderList=useSelector(state=>state.orderList)
    const {orders,loading:loadingOrders,error:errorOrders}=orderList
   
    const getUserDetail=(id)=>async()=>{
        try{
            dispatch(userDetailStart())
            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization:`Bearer ${userInfo.token}`
                }

            }
            const {data} = await axios.get(`/api/users/${id}/`,config)
           
            dispatch(userDetailSuccess(data))
    
           
        }catch(error){
            dispatch(userDetailFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message,
            ))
            setVariant(0);
        }
    }

    const updateUserProfile=(user)=>async()=>{
        try{
            dispatch(updateProfileStart())
            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization:`Bearer ${userInfo.token}`
                }

            }
            const {data} = await axios.put(`/api/users/profile/update/`,user,config)
            dispatch(updateProfileSuccess(data))
            dispatch(userLoginSuccess(data))
        }catch(error){
            dispatch( updateProfileFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message,
            ))
            setVariant(0);
        }
    }


    const listMyOrders = () => async () => {
        try {

            dispatch(orderListrequest())
            // const userInfo = getState().userLogin;
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
    
            }
            const { data } = await axios.get(`/api/orders/myorders/`,config)
            
             dispatch(orderListssuccess(data));
          
    
        } catch (error) {
            dispatch(orderListfail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message,
            ))
          
        }
    }
    

    
    useEffect(()=>{



















        
        if(!userInfo){
           
            navigate('/login')
        }else{
            if(!user || !user.name || success || userInfo._id !==user._id){
                dispatch( updateProfileReset())
                dispatch(getUserDetail('profile'))
                dispatch(listMyOrders())
                
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch,navigate,userInfo,user,success])

    
    const submitHandler=(e)=>{
        e.preventDefault();
        if(password!=confirmpassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(updateUserProfile({
                'id':user._id,
                'name':name,
                'email':email,
                'password':password
            }))
            setMessage('Your password is updated')
            setVariant(1);

        }
       


    }

   



  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant={variant ? 'success' :'danger'}>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={(e)=>submitHandler(e)}>

              <Form.Group controlId='name' style={{ margin: '1rem 0' }}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                      type='name'
                      required
                      placeholder='Enter name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  >

                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='email' style={{ margin: '1rem 0' }}>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                      type='email'
                      required
                      placeholder='Enter Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  >

                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='password' style={{ margin: '1rem 0' }}>
                  <Form.Label> New Password</Form.Label>
                  <Form.Control
                      type='password'
                      
                      placeholder='Enter Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  >

                  </Form.Control>
              </Form.Group>

              <Form.Group controlId='passwordConfirm' style={{ margin: '1rem 0' }}>
                  <Form.Label>confirm Password</Form.Label>
                  <Form.Control
                      type='password'
                     
                      placeholder='Confirm Password'
                      value={confirmpassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                  >

                  </Form.Control>
              </Form.Group>

              <Form.Group style={{margin:'1rem 0'}}>
            <Button type='submit' variant='primary'>
                Update
            </Button>
            </Form.Group>

        </Form> 
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? (
                <Loader/>
            ):errorOrders ?(
                <Message variant='danger'>{errorOrders}</Message>
            ):(
                <Table striped responsive bordered hover  className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            

                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order=>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? (
                                    <i className='fas fa-check' style={{color:'green'}}></i>
                                ):(
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            )}

        </Col>
    </Row>
  )
}

export default ProfileScreen