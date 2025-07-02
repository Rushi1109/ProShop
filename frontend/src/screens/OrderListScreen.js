import React,{useState,useEffect} from 'react'
import {Link, redirect} from 'react-router-dom'
import {Form ,Butoon,Row,Col,Button,Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { userListRequest,userListSuccess, userListFail, userListReset} from '../features/userListSlice'
import { userDeleteRequest,userDeleteSuccess, userDeleteFail } from '../features/userDeleteSlice'
import { orderAdminrequest,orderAdminssuccess,orderAdminfail,orderAdminreset } from '../features/orderAdminSlice'
import { LinkContainer } from 'react-router-bootstrap'



const OrderListScreen = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const orderAdminList=useSelector(state=>state.orderAdminList)
  const {orders,loading,error}=orderAdminList

  const { userInfo } = useSelector(state => state.userLogin)

  
  useEffect(()=>{
    if(userInfo && userInfo.isAdmin){
      dispatch(listOrders())
    }else{
      navigate('/login')
    }
    
  },[dispatch,navigate,userInfo])


  const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch(orderAdminrequest())
        // const userInfo = getState().userLogin;
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }

        }
        const { data } = await axios.get(`/api/orders/`,config)
      
         dispatch(orderAdminssuccess(data));
      

    } catch (error) {
        dispatch(orderAdminfail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message,
        ))
      
    }
}


 



  


  return (
    <div>
      <h1>Orders</h1>
      {loading 
        ?( <Loader/>)
        :error
          ?(<Message variant='danger'>{error}</Message>)
          :(
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                </tr>
                
                
                
              </thead>
              <tbody>
                { orders.map(order=>(
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(0,10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>{order.isPaid ? (
                      <i className='fas fa-check' style={{color:'green'}}></i>
                    ):(
                      <i className='fas fa-check' style={{color:'red'}}></i>
                 
                    )}</td>
                     <td>{order.isDelivered ? (
                      <i className='fas fa-check' style={{color:'green'}}></i>
                    ):(
                      <i className='fas fa-check' style={{color:'red'}}></i>
                 
                    )}</td>
                    <td>
                      <LinkContainer to={`/order/${order._id}/`}>
                        <Button variant='light'className='btn-sm'>
                            Details
                        </Button>
                      </LinkContainer>
                       
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>
          )

    }
    </div>
  )
}

export default OrderListScreen