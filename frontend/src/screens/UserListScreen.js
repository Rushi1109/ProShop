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

import { LinkContainer } from 'react-router-bootstrap'



const UserListScreen = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const userList=useSelector(state=>state.userList)
  const {users,loading,error}=userList

  const { userInfo } = useSelector(state => state.userLogin)

  const userDelete=useSelector(state=>state.userDelete)
  const {success:successDelete}=userDelete

 



  useEffect(()=>{
    if(userInfo && userInfo.isAdmin){
      dispatch(listUsers())
    }else{
      navigate('/login')
    }
    
  },[dispatch,navigate,successDelete,userInfo])

  const listUsers=()=>async()=>{
    try{
        dispatch(userListRequest())
        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }

        }
        const {data} = await axios.get(`/api/users/`,config)
        dispatch(userListSuccess(data))
       
    }catch(error){
        dispatch( userListFail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message,
        ))
        
    }
}
  

 

  const deleteHandler=(id)=>{
    if(window.confirm('Are you sure you want to delete this user?')){
      dispatch(deleteUser(id))
    }
    
    // console.log(id)
  }


  const deleteUser=(id)=>async()=>{
    try{
        dispatch(userDeleteRequest())
        const config={
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }

        }
        const {data} = await axios.delete(`/api/users/delete/${id}/`,config)
        dispatch(userDeleteSuccess(data))
       
    }catch(error){
        dispatch( userDeleteFail(
            error.response && error.response.data.detail ? error.response.data.detail : error.message,
        ))
        
    }
}
  


  return (
    <div>
      <h1>Users</h1>
      {loading 
        ?( <Loader/>)
        :error
          ?(<Message variant='danger'>{error}</Message>)
          :(
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
                </tr>
                
                
                
              </thead>
              <tbody>
                { users.map(user=>(
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? (
                      <i className='fas fa-check' style={{color:'green'}}></i>
                    ):(
                      <i className='fas fa-check' style={{color:'red'}}></i>
                 
                    )}</td>
                    <td>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant='light'className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                       <Button variant='danger'className='btn-sm' onClick={()=>deleteHandler(user._id)} >
                          <i className='fas fa-trash'></i>
                        </Button>
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

export default UserListScreen